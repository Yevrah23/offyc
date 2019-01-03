import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { UserServices } from 'src/app/services/user_services';
declare var $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  token: any;

  // Calendar api
  calendarOptions: Options;
  events: any;
  eventService: any;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  // data tables
  @ViewChild('dataTable') table: ElementRef;
  dataTable: any;

  constructor(private user:UserServices) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem(sessionStorage.getItem('id'));
    this.user.check_login(this.token).subscribe(
      (response) => {
        console.log(response);
      }
    )






    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      selectable: true,
      events: []
    };

// Display data tables
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.dataTable();

  }

  clearEvents() {
    this.events = [];
  }
  loadEvents() {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    });
  }
}
