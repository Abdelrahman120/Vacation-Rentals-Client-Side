import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatRoomService } from '../../services/chatRoom/chat-room.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDetailsService } from '../../services/user-details.service';
import { PhonePipe } from '../../pipes/phone.pipe';

@Component({
  selector: 'app-owner-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, PhonePipe],
  templateUrl: './owner-chat.component.html',
  styleUrl: './owner-chat.component.css',
})
export class OwnerChatComponent implements OnInit, OnDestroy {
  constructor(
    private router: ActivatedRoute,
    private ChatRoomService: ChatRoomService,
    private userDetails: UserDetailsService
  ) {}

  ownerId: number = 0;
  guestId: number = 0;
  bookingId: number = 0;
  ownerName: string = '';
  room: any;
  messages: any[] = [];
  newMessage = '';
  roomDetails: any;
  propertyId: number = 0;
  guestName: string = '';
  guestEmail: string = '';
  guestImage: string = '';
  guestPhone: string = '';

  ngOnInit(): void {
    this.router.params.subscribe((param: any) => {
      this.guestId = param['guestId'];
      this.bookingId = param['bookingId'];
      this.propertyId = param['id'];
    });

    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.getUser();
    this.getOwner();
    this.getMessages();
    this.loadMessagesFromDb();
    this.subscribeToMessages();
    this.ChatRoomService.getRoomDetails(this.bookingId);

    this.subscribeToMessages();
  }

  getMessages() {
    this.ChatRoomService.getRoomDetails(this.bookingId).subscribe({
      next: (res) => {
        this.roomDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  loadMessagesFromDb(): void {
    this.ChatRoomService.getMessagePerBooking(this.bookingId).subscribe({
      next: (res: any) => {
        this.messages = res.messages.map((msg: any) => ({
          ...msg,
          username: msg.sender === 'guest' ? this.guestName : this.ownerName,
        }));
      },
      error: (err: any) => {
        console.error('Error loading messages from DB:', err);
      },
    });
  }

  subscribeToMessages() {
    this.ChatRoomService.currentMessages.subscribe({
      next: (newMessages: any[]) => {
        this.messages = [...this.messages, ...newMessages];
      },
      error: (error: any) => {
        console.error('Error in real-time message subscription:', error);
      },
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const senderRole = 'owner';
      this.ChatRoomService.sendMessage(
        this.guestId,
        this.ownerId,
        this.bookingId,
        senderRole,
        this.ownerName,
        this.newMessage
      ).subscribe({
        next: (res) => {
          this.newMessage = '';
        },
        error: (error: any) => console.error(error),
      });
    }
  }

  // getPreviousMessages() {
  //   this.ChatRoomService.getMessagePerBooking(this.bookingId).subscribe({
  //     next: (res: any) => {
  //       this.messages = res.messages;
  //     },
  //     error: (err: any) => {
  //       console.error(err);
  //     },
  //   });
  // }

  ngOnDestroy(): void {
    this.ChatRoomService.unsubscribeFromChatChannel(
      this.guestId,
      this.ownerId,
      this.bookingId
    );
  }

  getOwner() {
    this.ChatRoomService.getOwnerByProperty(this.propertyId).subscribe({
      next: (res: any) => {
        this.ownerName = res.data.name;
        this.ownerId = res.data.id;

        this.ChatRoomService.subscribeToChatChannel(
          this.guestId,
          this.ownerId,
          this.bookingId
        );
      },
      error: (error) => {
        console.error('Host Information: ', error);
      },
    });
  }

  getUser() {
    this.userDetails.getUserById(this.guestId).subscribe({
      next: (res: any) => {
        this.guestName = res.data?.name || '';
        this.guestEmail = res.data?.email || '';
        this.guestImage = res.data?.image || '';
        this.guestPhone = res.data?.phone || '';

        console.log('guest name:', this.guestName);
      },
      error: (error: any) => console.error(error),
    });
  }
}
