import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { UserServices } from 'src/app/services/user_services';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import * as $ from 'jquery';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  token: any;
  session:any;

  // Calendar api
  calendarOptions: Options;
  events: any;
  eventService: any;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  // data tables
  dataTable: any;
  // records: any[];
  // spinner
  showSpinner = true;
  showData = false;
  // mat-table
  transactionCol: string[] = ['transaction', 'date'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // tslint:disable-next-line:max-line-length
  constructor(private user: UserServices, private cookies: CookieService, private router: Router, private http: HttpClient, private chRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.get_events();
    this.get_transactions();

    // retrieve data  via HTTP
    // this.http.get('https://jsonplaceholder.typicode.com/users')
    //   .subscribe((data: any[]) => {
    //     this.showSpinner = false;
    //     this.showData = true;
    //     // this.records = data;
    //     this.dataSource = new MatTableDataSource(data); // for mat-table

    //     // mat table
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //     // this.chRef.detectChanges();
    //     // User
    //     // Display data tables
    //     // // user
    //     // const table: any = $('#transaction');
    //     // this.dataTable = table.dataTable();
    //   });
  }

  // search table
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearEvents() {
    this.events = [];
  }
  loadEvents() {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    });
  }

  get_events(){
    this.user.getEvents().subscribe(data => {
      this.calendarOptions = {
        editable: false,
        eventLimit: false,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listMonth'
        },
        events: data
      };
    });
  }

  get_transactions() {
    this.user.get_transactions(this.cookies.get('id')).subscribe(data => {
      console.log(data);
    })
  }
}
