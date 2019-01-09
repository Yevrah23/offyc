import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { UserServices } from 'src/app/services/user_services';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

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
  dataTable: any;
  // table data sample
  records: any[];

  // tslint:disable-next-line:max-line-length
  constructor(private user: UserServices, private cookies: CookieService, private router: Router, private http: HttpClient , private chRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.token = this.cookies.get(this.cookies.get('id'));
    this.user.check_login(this.token).subscribe(
      (response) => {
        console.log(response[0]);
        if (response[0]) {
          // this.router.navigate(['/']);
        } else {
          // console.log('Hello Admin')
        }
      }
    );

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

    this.http.get('https://jsonplaceholder.typicode.com/users')
    .subscribe((data: any[]) => {
      this.records = data;

      this.chRef.detectChanges();
    // User
    // Display data tables
    // user
    const table: any = $('#transaction');
    this.dataTable = table.dataTable();
    });

  }

  loadTable() {
    console.log('table loaded');
    this.chRef.detectChanges();
    const table: any = $('table');
    this.dataTable = table.dataTable();
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
