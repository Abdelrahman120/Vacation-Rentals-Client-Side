import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import { OwnerSidebarComponent } from '../owner-sidebar/sidebar.component';
@Component({
  selector: 'app-my-property-details',
  standalone: true,
  imports: [FullCalendarModule, OwnerSidebarComponent],
  templateUrl: './my-property-details.component.html',
  styleUrl: './my-property-details.component.css',
})
export class MyPropertyDetailsComponent {
  constructor() {}
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    events: [
      { title: 'event 1', date: '2024-10-01', end: "'2024-10-29'" },
      { title: 'event 2', date: '' },
    ],
  };

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr);
  }
}
