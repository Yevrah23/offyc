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
  displayedColumns: string[] = ['id', 'name', 'username'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // tslint:disable-next-line:max-line-length
  constructor(private user: UserServices, private cookies: CookieService, private router: Router, private http: HttpClient, private chRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
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

  captureScreen(quality = 1) {
    const data = document.getElementById('toPdf');
    html2canvas(data, {scale: quality}).then(canvas => {
      // Few necessary setting options
      const pdf = new jspdf('l', 'pt', 'A4');

            for (let i = 0; i <= data.clientHeight / 980; i++) {
                // ! This is all just html2canvas stuff
                const srcImg  = canvas;
                const sX      = 0;
                const sY      = 980 * i; // start 980 pixels down for every new page
                const sWidth  = data.clientWidth;
                const sHeight = 980;
                const dX      = 0;
                const dY      = 0;
                const dWidth  = data.clientWidth;
                const dHeight = 980;

                // tslint:disable-next-line:prefer-const
                let onePageCanvas = document.createElement('canvas');
                onePageCanvas.setAttribute('width', '1158');
                onePageCanvas.setAttribute('height', '980');
                const ctx = onePageCanvas.getContext('2d');
                // details on this usage of this function:
                // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
                ctx.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

                // document.body.appendChild(onePageCanvas);
                const canvasDataURL = onePageCanvas.toDataURL('image/png', 1.0);

                const width         = onePageCanvas.width;
                const height        = onePageCanvas.clientHeight;

                // ! If we're on anything other than the first page,
                // add another page
                if (i > 0) {
                    pdf.addPage('A4', 'l'); // 791, 612 8.5" x 11" in pts (in*72)
                    // 842, 595, 8.27 × 11.69 inches A4 in pts (in*72)
                }
                // ! now we declare that we're working on that page
                pdf.setPage(i + 1);
                // !now we add content to that page! 20, 40
                pdf.addImage(canvasDataURL, 'PNG', 40, 0, (width * .62), (height * .62));
            }
            // ! after the for loop is finished running, we save the pdf.
            pdf.save('Test.pdf');
    });
  }
}
