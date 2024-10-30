import {
  Component,
  signal,
  ChangeDetectorRef,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  FullCalendarModule,
  FullCalendarComponent,
} from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { BookingAndBlocksService } from '../../services/booking-and-blocks.service';
import { ActivatedRoute } from '@angular/router';
import { OwnerSidebarComponent } from '../owner-sidebar/sidebar.component';
import * as bootstrap from 'bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FullCalendarModule,
    OwnerSidebarComponent,
    FormsModule,
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements AfterViewInit, OnInit {
  @ViewChild('fullcalendar') calendarComponent!: FullCalendarComponent;

  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [interactionPlugin, dayGridPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'addBlockButton,hidePropertyButton',
    },
    customButtons: {
      addBlockButton: {
        text: 'Add Block',
        click: () => {
          this.openAddBlockModal();
        },
      },
      hidePropertyButton: {
        text: 'Hide Property',
        click: () => {
          this.openHidePropertyModal();
        },
      },
    },
    editable: false,
    selectable: false,
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventClassNames: this.applyEventClasses.bind(this),
    dayCellClassNames: this.applyDayClasses.bind(this),
  });
  currentEvents = signal<EventApi[]>([]);
  propertyId: string = '';
  blocks: any[] = [];
  bookings: any[] = [];
  blockIdToDelete: string | null = null;
  startDate: string = '';
  endDate: string = '';
  showAlert: boolean = false;

  constructor(
    private bookingAndBlocksService: BookingAndBlocksService,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef
  ) {
    this.propertyId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit() {
    this.loadEventsFromLocalStorage();
    this.loadEvents();
  }

  ngAfterViewInit() {
    const calendarApi = this.calendarComponent.getApi();
    if (calendarApi) {
      console.log('FullCalendar API is accessible:', calendarApi);
    } else {
      console.error('FullCalendar API is not available yet.');
    }
  }

  loadEvents() {
    this.bookingAndBlocksService
      .getEvents(this.propertyId)
      .subscribe(([blocks, bookings]) => {
        this.blocks = blocks.data || [];
        this.bookings = bookings.data || [];
        console.log('Bookings', bookings.data);
        console.log('Blocks', this.blocks);
        this.updateCalendarEvents();
        this.saveEventsToLocalStorage();
      });
  }

  updateCalendarEvents() {
    const blockEvents = this.blocks.map((block: any) => ({
      id: String(block.id),
      title: 'Blocked',
      start: block.start_date,
      end: block.end_date,
      backgroundColor: '#3C3D37',
      extendedProps: {
        type: 'block',
      },
    }));

    const bookingEvents = this.bookings.map((booking: any) => ({
      id: String(booking.id),
      title: `${booking.guest_name}'s Booking`,
      start: booking.start_date,
      end: booking.end_date,
      backgroundColor: '#347928',
      extendedProps: {
        type: 'booking',
      },
    }));

    this.calendarOptions.update((options) => ({
      ...options,
      events: [...blockEvents, ...bookingEvents],
    }));
  }

  saveEventsToLocalStorage() {
    const allEvents = [...this.blocks, ...this.bookings];
    localStorage.setItem(
      `events-${this.propertyId}`,
      JSON.stringify(allEvents)
    );
  }

  loadEventsFromLocalStorage() {
    const events = localStorage.getItem(`events-${this.propertyId}`);
    if (events) {
      const parsedEvents = JSON.parse(events);
      this.blocks = parsedEvents.filter((event: any) => event.type === 'block');
      this.bookings = parsedEvents.filter(
        (event: any) => event.type === 'booking'
      );
      this.updateCalendarEvents();
    }
  }

  openAddBlockModal(): void {
    const modalElement = document.getElementById('addBlockModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  openHidePropertyModal() {
    const modalElement = document.getElementById('hidePropertyModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  addBlock(): void {
    const dates = {
      start_date: this.startDate,
      end_date: this.endDate,
    };

    this.bookingAndBlocksService.addBlock(this.propertyId, dates).subscribe({
      next: (response: any) => {
        this.addEventToCalendar(response.data.id, this.startDate, this.endDate);
        this.blocks.push({
          id: response.data.id,
          start_date: this.startDate,
          end_date: this.endDate,
          type: 'block',
        });

        this.saveEventsToLocalStorage();

        this.startDate = '';
        this.endDate = '';

        const modalElement = document.getElementById('addBlockModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }
        }
      },
      error: (error) => {
        console.error('Error adding block:', error);
      },
    });
  }

  addEventToCalendar(eventId: string, start: string, end: string): void {
    if (this.calendarComponent) {
      const calendarApi = this.calendarComponent.getApi();
      if (calendarApi) {
        const newEvent = {
          id: eventId,
          title: 'Blocked',
          start: start,
          end: end,
          backgroundColor: '#3C3D37',
          extendedProps: {
            type: 'block',
          },
        };
        console.log('Adding Event:', newEvent);
        calendarApi.addEvent(newEvent);
      } else {
        console.error('FullCalendar API not available!');
      }
    }
  }

  prepareDeleteEvent(blockId: string) {
    this.blockIdToDelete = blockId;
    const modalElement = document.getElementById('confirmDeleteModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  confirmDelete() {
    if (this.blockIdToDelete) {
      this.handleDeleteEvent(this.blockIdToDelete);
      this.blockIdToDelete = null;
    }
  }

  handleDeleteEvent(blockId: string) {
    this.bookingAndBlocksService
      .removeBlock(this.propertyId, blockId)
      .subscribe({
        next: () => {
          const calendarApi = this.calendarComponent.getApi();
          const eventToRemove = calendarApi.getEventById(blockId);
          if (eventToRemove) {
            eventToRemove.remove();
            this.blocks = this.blocks.filter((block) => block.id !== blockId);
            this.saveEventsToLocalStorage();
          }
        },
        error: (error) => {
          console.error('Error removing block:', error);
        },
      });
  }

  handleEventClick(clickInfo: EventClickArg) {
    const blockId = clickInfo.event.id;

    if (!blockId || blockId === 'undefined') {
      console.error('Block ID is missing or undefined!');
      return;
    }

    if (clickInfo.event.extendedProps['type'] === 'booking') {
      return;
    } else {
      this.prepareDeleteEvent(blockId);
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges();
  }

  applyEventClasses(arg: any) {
    const today = new Date();
    const eventEnd = new Date(arg.event.end || arg.event.start);
    if (eventEnd < today) {
      return ['past-event'];
    }
    return [];
  }

  applyDayClasses(dateInfo: any) {
    const today = new Date();
    const date = new Date(dateInfo.date);
    if (date < today) {
      return ['past-date'];
    }
    return [];
  }
  updateShowProperty(propertyId: any, status: any) {
    this.bookingAndBlocksService.updateShow(propertyId, status).subscribe(
      (response) => {
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 5000);
        console.log('Property status updated:', response);
      },
      (error) => {
        console.error('Error updating property status:', error);
      }
    );
  }
}
