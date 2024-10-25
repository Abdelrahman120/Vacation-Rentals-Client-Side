import {
  Component,
  signal,
  ChangeDetectorRef,
  ViewChild,
  AfterViewInit,
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
export class CalendarComponent implements AfterViewInit {
  @ViewChild('fullcalendar') calendarComponent!: FullCalendarComponent;

  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [interactionPlugin, dayGridPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'addBlockButton',
    },
    customButtons: {
      addBlockButton: {
        text: 'Add Block',
        click: () => {
          this.openAddBlockModal();
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

  startDate: string = '';
  endDate: string = '';

  constructor(
    private bookingAndBlocksService: BookingAndBlocksService,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef
  ) {
    this.propertyId = this.route.snapshot.paramMap.get('id') || '';
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
        this.blocks = blocks.data;
        this.bookings = bookings.data;
        this.updateCalendarEvents();
      });
  }

  updateCalendarEvents() {
    const blockEvents = this.blocks.map((block: any) => ({
      id: block.id,
      title: 'Blocked',
      start: block.start_date,
      end: block.end_date,
      backgroundColor: '#3C3D37',
      type: 'block',
    }));

    const bookingEvents = this.bookings.map((booking: any) => ({
      id: booking.id,
      title: `${booking.guest_name}'s Booking`,
      start: booking.start_date,
      end: booking.end_date,
      backgroundColor: '#347928',
      type: 'booking',
    }));

    this.calendarOptions.update((options) => ({
      ...options,
      events: [...blockEvents, ...bookingEvents],
    }));
  }

  openAddBlockModal(): void {
    const modalElement = document.getElementById('addBlockModal');
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
          id: response.id,
          start_date: this.startDate,
          end_date: this.endDate,
        });

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

  addEventToCalendar(id: string, start: string, end: string): void {
    if (this.calendarComponent) {
      const calendarApi = this.calendarComponent.getApi();
      if (calendarApi) {
        calendarApi.addEvent({
          id: id,
          title: 'Blocked',
          start: start,
          end: end,
          backgroundColor: '#3C3D37',
          type: 'block',
        });
      } else {
        console.error('FullCalendar API not available!');
      }
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    const blockId = clickInfo.event.id;

    if (!blockId) {
      console.error('Block ID is missing or undefined!');
      return;
    }

    if (clickInfo.event.extendedProps['type'] === 'booking') {
      alert('Bookings cannot be removed.');
    } else if (
      confirm(`Are you sure you want to remove '${clickInfo.event.title}'?`)
    ) {
      this.bookingAndBlocksService
        .removeBlock(this.propertyId, blockId)
        .subscribe({
          next: (response) => {
            clickInfo.event.remove();
            this.blocks = this.blocks.filter((block) => block.id !== blockId);
            this.updateCalendarEvents();
          },
          error: (error) => {
            console.error('Error removing block:', error);
          },
        });
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
}
