import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatRoomService } from '../../services/chatRoom/chat-room.service';
import { UserDetailsService } from '../../services/user-details.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit, OnDestroy {
  propId: number = 0;
  hostId: number = 0;
  guestId: number = 0;
  bookingId: number = 0;
  guestName: string = '';
  room: any;
  messages: any[] = [];
  newMessage = '';

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatRoomService,
    private userDetails: UserDetailsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.propId = Number(params['propId']);
      this.hostId = Number(params['ownerId']);
      this.bookingId = Number(params['bookingId']);
    });
    this.guestId = Number(localStorage.getItem('userId'));
    console.log({
      userId: this.guestId,
      hostId: this.hostId,
      propId: this.propId,
      bookingId: this.bookingId,
    });

    this.getUser();
    this.subscribeToMessages();
    this.chatService.subscribeToChatChannel(
      this.guestId,
      this.hostId,
      this.bookingId
    );
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
      this.chatService
        .sendMessage(this.guestId, this.hostId, this.guestName, this.newMessage)
        .subscribe({
          next: (res) => {
            this.newMessage = '';
            console.log(res);
          },
          error: (error: any) => console.error(error),
        });
    }
  }

  ngOnDestroy(): void {
    this.chatService.unsubscribeFromChatChannel(this.guestId, this.hostId);
  }

  getUser() {
    this.userDetails.getUserById(this.guestId).subscribe({
      next: (user: any) => {
        this.guestName = user.data['name'] ? user.data['name'] : '';
        console.log(user);
      },
      error: (err) => console.error(err),
    });
  }
}
