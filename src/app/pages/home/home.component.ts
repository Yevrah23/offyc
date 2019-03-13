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
  CITC = [];
  COT = [];
  CSTE = [];
  CEA = [];
  CSM = [];



  isAdmin: boolean = false;


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
    this.get_chart();
    setTimeout(() => {
      if (this.user.admin) {
        this.isAdmin = true;
        this.get_events();
      }else{
        this.get_events_user();
      }
    }, 1500);

    // chartJs
    this.chRef.detectChanges();
    this.get_adminChart(); // if admin


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
          right: 'month,agendaWeek,agendaDay,listMonth'
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
      this.showSpinner = false;
      this.showData = true;
      this.dataSource = new MatTableDataSource(data);
    });
  }

  // when seleted tab index
  // selectedPageIndex() {
  // }

  get_chart(){
    this.user.get_chart().subscribe(
      (response:any []) => {
        for (let index = 0; index < response.length; index++) {
          console.log(response[index]);
          if (response[index].length == 0){
              this.CITC.push(0);
              this.CEA.push(0);
              this.CSTE.push(0);
              this.CSM.push(0);
              this.COT.push(0);
          }else{
            for (let i = 0; i < response[index].length; i++) {
              // response[index][i];

              if (response[index][i].College === "CITC") {
                this.CITC.push(parseInt(response[index][i].Count));
              } else if (response[index][i].College === "CEA") {
                this.CEA.push(parseInt(response[index][i].Count));
              } else if (response[index][i].College === "CSTE") {
                this.CSTE.push(parseInt(response[index][i].Count));
              } else if (response[index][i].College === "CSM") {
                this.CSM.push(parseInt(response[index][i].Count));
              } else if (response[index][i].College === "COT") {
                this.COT.push(parseInt(response[index][i].Count));
              }
              
            }
            if (this.CITC[index] == null) {
              this.CITC.push(0);
            } if (this.CEA[index] == null) {
              this.CEA.push(0);
            } if (this.CSTE[index] == null) {
              this.CSTE.push(0);
            } if (this.CSM[index] == null) {
              this.CSM.push(0);
            } if (this.COT[index] == null) {
              this.COT.push(0);
            }
          }
        }
      }
    )
  }

  get_adminChart() {
    this.chartAdmin = new Chart('chartAdmin', {
      type: 'line',
      data: {
        labels: ['1st Qtr', '2nd Qtr', '3rd Qtr', '4th Qtr'],
        datasets: [{
          label: 'CITC',
          // data: [this.CITC[0], this.CITC[1],this.CITC[2] , this.CITC[3]], // mao ning mga data sa chart
          data: this.CITC,
          borderColor: '#2E3131',
          backgroundColor: '#2E3131',
          fill: false,
        }, {
          label: 'CSTE',
          // data: [this.CSTE[0], this.CSTE[1], this.CSTE[2], this.CSTE[3]], // mao ning mga data sa chart
          data: this.CSTE,
          borderColor: '#1E8BC3',
          backgroundColor: '#1E8BC3',
          fill: false,
        }, {
          label: 'COT',
          // data: [this.COT[0], this.COT[1], this.COT[2], this.COT[3]], // mao ning mga data sa chart
          data: this.COT,
          borderColor: '#D91E18',
          backgroundColor: '#D91E18',
          fill: false,
        }, {
          label: 'CSM',
          // data: [this.CSM[0], this.CSM[1], this.CSM[2], this.CSM[3]], // mao ning mga data sa chart
          data: this.CSM,
          borderColor: '#26A65B',
          backgroundColor: '#26A65B',
          fill: false,
        }, {
          label: 'CEA',
          // data: [this.CEA[0], this.CEA[1], this.CEA[2], this.CEA[3]], // mao ning mga data sa chart
          data: this.CEA,
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
