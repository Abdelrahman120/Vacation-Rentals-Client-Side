import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
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

  // getRoomDetails(bookingId: number): Observable<any> {
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
  //   const userId =
  //     localStorage.getItem('userId') ?? localStorage.getItem('owner_id');
  //   return this.http.get<any>(
  //     `${this.BACKEND_API}/api/rooms/${userId}/${bookingId}`,
  //     { headers }
  //   );
  // }

  getRoomDetails(bookingId: number): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const userId =
      localStorage.getItem('userId') ?? localStorage.getItem('owner_id');

    this.http
      .get<any>(`${this.BACKEND_API}/api/rooms/${userId}/${bookingId}`, {
        headers,
      })
      .subscribe({
        next: (messages) => {
          this.messagesSource.next(messages);
        },
        error: (error) => {
          console.error('Error fetching messages:', error);
        },
      });
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

    this.chatChannel.bind('message', (data: any) => {
      console.log('Received message:', data);
      this.addMessage({
        senderId: data.sender_id,
        senderName: data.sender_name,
        content: data.content,
      });
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
    username: string,
    message: string
  ): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    const messageData = {
      guest_id: guestId,
      host_id: hostId,
      booking_id: bookingId,
      username: username,
      message: message,
    };

    return this.http.post<any>(
      `${this.BACKEND_API}/api/booking/message`,
      messageData,
      { headers }
    );
  }
}
