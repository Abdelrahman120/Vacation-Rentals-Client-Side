import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { NgxDaterangepickerBootstrapDirective, NgxDaterangepickerBootstrapComponent } from "ngx-daterangepicker-bootstrap";
import dayjs, { Dayjs } from "dayjs";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgxDaterangepickerBootstrapDirective, NgxDaterangepickerBootstrapComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

}
