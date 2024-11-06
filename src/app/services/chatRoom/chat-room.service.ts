import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import Pusher from 'pusher-js';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ChatRoomService {
  private pusher: Pusher;
  private chatChannel: any;
  BACKEND_API = `${environment.BACKEND_URL}`;

  public messagesSource = new BehaviorSubject<any[]>([]);
  currentMessages = this.messagesSource.asObservable();

  getRoomDetails(bookingId: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const userId =
      localStorage.getItem('userId') ?? localStorage.getItem('owner_id');

    return this.http.get<any>(
      `${this.BACKEND_API}/api/rooms/${userId}/${bookingId}`,
      {
        headers,
      }
    );
  }

  constructor(private http: HttpClient) {
    this.pusher = new Pusher(environment.PUSHER_KEY, {
      authEndpoint: `${this.BACKEND_API}/api/pusher/auth`,
      cluster: environment.PUSHER_CLUSTER,
      auth: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    });
  }

  subscribeToChatChannel(
    guestId: number,
    hostId: number,
    bookingId: number
  ): void {
    const channelName = `chat.${guestId}.${hostId}.${bookingId}`;
    this.chatChannel = this.pusher.subscribe(channelName);
    console.log('Channel Name', channelName);

    this.chatChannel.bind('message', (data: any) => {
      console.log('Received message:', data);

      this.addMessage(data);
    });

    this.chatChannel.bind('pusher:subscription_error', (status: any) => {
      console.error('Subscription error:', status);
    });

    this.chatChannel.bind('pusher:subscription_succeeded', () => {
      console.log('Successfully subscribed to channel:', channelName);
    });
  }

  private addMessage(message: any): void {
    const currentMessages = this.messagesSource.value;
    this.messagesSource.next([...currentMessages, message]);
  }

  unsubscribeFromChatChannel(
    guestId: number,
    hostId: number,
    bookingId: number
  ): void {
    if (this.chatChannel) {
      this.chatChannel.unbind_all();
      this.pusher.unsubscribe(`chat.${guestId}.${hostId}.${bookingId}`);
    }
  }

  sendMessage(
    guestId: number,
    hostId: number,
    bookingId: number,
    userRole: string,
    username: string,
    message: string
  ): Observable<any> {
    const token =
      localStorage.getItem('token') || localStorage.getItem('owner_auth_token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    const messageData = {
      guest_id: guestId,
      host_id: hostId,
      booking_id: bookingId,
      sender_role: userRole,
      username: username,
      message: message,
    };

    return this.http.post<any>(
      `${this.BACKEND_API}/api/booking/message`,
      messageData,
      { headers }
    );
  }

  getOwnerByProperty(propertyId: number): Observable<any> {
    const token = localStorage.getItem('owner_auth_token');
    if (!token) {
      return throwError(() => new Error('Error Auth Token is Required'));
    }
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post<any>(
      `${this.BACKEND_API}/api/booking/owner-info/${propertyId}`,
      { headers }
    );
  }

  getMessagePerBooking(bookingId: number): Observable<any> {
    const token =
      localStorage.getItem('token') || localStorage.getItem('owner_auth_token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get<any>(
      `${this.BACKEND_API}/api/booking/${bookingId}/messages`,
      { headers }
    );
  }
}
