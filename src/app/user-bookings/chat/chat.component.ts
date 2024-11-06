import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatRoomService } from '../../services/chatRoom/chat-room.service';
import { UserDetailsService } from '../../services/user-details.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OwnerInfoService } from '../../services/owner-info.service';
import { PhonePipe } from '../../pipes/phone.pipe';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, PhonePipe],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit, OnDestroy {
  hostId: number = 0;
  guestId: number = 0;
  bookingId: number = 0;
  guestName: string = '';
  messages: any[] = [];
  newMessage = '';
  hostName: string = '';
  hostEmail: string = '';
  hostImage: string = '';
  hostPhone: string = '';

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatRoomService,
    private userDetails: UserDetailsService,
    private ownerInfoService: OwnerInfoService
  ) {}

  ngOnInit(): void {
    // Retrieve route parameters
    this.route.params.subscribe((params: any) => {
      this.hostId = Number(params['ownerId']);
      this.bookingId = Number(params['bookingId']);
    });
    this.guestId = Number(localStorage.getItem('userId'));

    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.getUser();
    this.getOwnerDetails();

    this.loadMessagesFromDb();

    this.subscribeToMessages();
  }

  loadMessagesFromDb(): void {
    this.chatService.getMessagePerBooking(this.bookingId).subscribe({
      next: (res: any) => {
        this.messages = res.messages.map((msg: any) => ({
          ...msg,
          username: msg.sender === 'guest' ? this.guestName : this.hostName,
        }));
      },
      error: (err: any) => {
        console.error('Error loading messages from DB:', err);
      },
    });
  }

  subscribeToMessages(): void {
    this.chatService.subscribeToChatChannel(
      this.guestId,
      this.hostId,
      this.bookingId
    );

    this.chatService.currentMessages.subscribe({
      next: (newMessages: any[]) => {
        this.messages = [...this.messages, ...newMessages];
      },
      error: (error: any) => {
        console.error('Error in real-time message subscription:', error);
      },
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      const senderRole = 'guest';
      this.chatService
        .sendMessage(
          this.guestId,
          this.hostId,
          this.bookingId,
          senderRole,
          this.guestName,
          this.newMessage
        )
        .subscribe({
          next: (res) => {
            this.newMessage = '';
          },
          error: (error: any) => console.error(error),
        });
    }
  }

  ngOnDestroy(): void {
    this.chatService.unsubscribeFromChatChannel(
      this.guestId,
      this.hostId,
      this.bookingId
    );
  }

  getUser(): void {
    this.userDetails.getUserById(this.guestId).subscribe({
      next: (user: any) => {
        this.guestName = user.data?.name || '';
      },
      error: (err) => console.error('Error getting user info:', err),
    });
  }

  getOwnerDetails(): void {
    this.ownerInfoService.getOwnerById(this.hostId).subscribe({
      next: (res: any) => {
        this.hostName = res.data?.name || '';
        this.hostEmail = res.data?.email || '';
        this.hostImage = res.data?.image || '';
        this.hostPhone = res.data?.phone || '';
      },
      error: (err) => console.error('Error getting owner info:', err),
    });
  }
}
