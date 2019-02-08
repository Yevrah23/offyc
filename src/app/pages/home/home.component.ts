import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { UserServices } from 'src/app/services/user_services';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Chart } from 'chart.js';

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
  session: any;

  // charts
  chartAdmin: any;
  chartUser: any;

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
    this.get_transactions();
    setTimeout(() => {
      if (this.user.admin) {
        this.get_events();
      } else {
        this.get_events_user();

      }
    }, 1500);

    // chartJs
    this.chRef.detectChanges();
    this.get_adminChart(); // if admin

    this.chRef.detectChanges();
    this.get_userChart(); // if user


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

  get_events() {
    this.user.getEvents().subscribe(data => {
      this.calendarOptions = {
        editable: false,
        eventLimit: false,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'listMonth,agendaWeek,agendaDay'
        },
        events: data
      };
    });
  }

  get_events_user() {
    this.user.getEvents_user(this.user.college).subscribe(data => {
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
    this.user.get_transactions(this.cookies.get('id')).subscribe((data: any[]) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  // when seleted tab index
  // selectedPageIndex() {
  // }

  get_adminChart() {
    this.chartAdmin = new Chart('chartAdmin', {
      type: 'line',
      data: {
        labels: ['1st Qtr', '2nd Qtr', '3rd Qtr', '4th Qtr'],
        datasets: [{
          label: 'CITC',
          data: [12, 19, 3, 18], // mao ning mga data sa chart
          borderColor: '#2E3131',
          backgroundColor: '#2E3131',
          fill: false,
        }, {
          label: 'CSTE',
          data: [5, 7, 8, 12], // mao ning mga data sa chart
          borderColor: '#1E8BC3',
          backgroundColor: '#1E8BC3',
          fill: false,
        }, {
          label: 'COT',
          data: [3, 15, 6, 8], // mao ning mga data sa chart
          borderColor: '#D91E18',
          backgroundColor: '#D91E18',
          fill: false,
        }, {
          label: 'CSM',
          data: [11, 16, 7, 14], // mao ning mga data sa chart
          borderColor: '#26A65B',
          backgroundColor: '#26A65B',
          fill: false,
        }, {
          label: 'CEA',
          data: [25, 13, 3, 18], // mao ning mga data sa chart
          borderColor: '#96281B',
          backgroundColor: '#96281B',
          fill: false,
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Progress Report'
        },
        legend: {
          display: true
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        sacles: {
          xAxes: [{
            display: true,
          }],
          yAxes: [{
            display: true
          }]
        }
      }
    });
  }

  get_userChart() {
    this.chartUser = new Chart('chartUser', {
      type: 'line',
      data: {
        labels: ['1st Qtr', '2nd Qtr', '3rd Qtr', '4th Qtr'],
        datasets: [{
          label: 'College name',
          data: [12, 19, 3, 5], // mao ning mga data sa chart
          borderColor: '#3cba9f',
          backgroundColor: '#3cba9f',
          fill: false,
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Progress Report'
        },
        legend: {
          display: true
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        sacles: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }]
        }
      }
    });
  }
}
