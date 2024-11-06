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
  constructor(
    private route: ActivatedRoute,
    private chatService: ChatRoomService,
    private userDetails: UserDetailsService,
    private ownerInfoService: OwnerInfoService
  ) {}

  hostId: number = 0;
  guestId: number = 0;
  bookingId: number = 0;
  guestName: string = '';
  room: any;
  messages: any[] = [];
  newMessage = '';
  roomDetails: any;
  hostName: string = '';
  hostEmail: string = '';
  hostImage: string = '';
  hostPhone: string = '';

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.hostId = Number(params['ownerId']);
      this.bookingId = Number(params['bookingId']);
    });
    this.guestId = Number(localStorage.getItem('userId'));

    this.getUser();
    this.getOwnerDetails();
    this.subscribeToMessages();
    this.chatService.getRoomDetails(this.bookingId);
  }

  getMessages() {
    this.chatService.getRoomDetails(this.bookingId).subscribe({
      next: (res) => {
        this.roomDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  subscribeToMessages() {
    this.chatService.currentMessages.subscribe({
      next: (messages: any[]) => {
        console.log('Messages Received in Component:', messages);
        this.messages = messages;
      },
      error: (error: any) => {
        console.error('Subscribe Error:', error);
      },
    });
  }

  sendMessage() {
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
            console.log(res);
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

  getUser() {
    this.userDetails.getUserById(this.guestId).subscribe({
      next: (user: any) => {
        this.guestName = user.data?.name || '';
        this.chatService.subscribeToChatChannel(
          this.guestId,
          this.hostId,
          this.bookingId
        );
      },
      error: (err) => console.error(err),
    });
  }

  getOwnerDetails() {
    this.ownerInfoService.getOwnerById(this.hostId).subscribe({
      next: (res: any) => {
        this.hostName = res.data?.name || '';
        this.hostEmail = res.data?.email || '';
        this.hostImage = res.data?.image || '';
        this.hostPhone = res.data?.phone || '';
        console.log('owner info: ', res.data);
      },
      error: (err) => console.error('Owner Info: ', err),
    });
  }
}
