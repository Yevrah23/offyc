import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { UserServices } from 'src/app/services/user_services';
import { CookieService } from 'ngx-cookie-service';
<<<<<<< HEAD
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
=======
import { Router,ActivatedRoute } from '@angular/router';
// import * as jspdf from 'jspdf';
// import html2canvas from 'html2canvas';
// declare var $;
// interface window {
//   onePageCanvas: any; 
// }
// window.onePageCanvas = window.onePageCanvas || {};
>>>>>>> c29d3718cccca8ecc10c07314b869d082fd5e839

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
<<<<<<< HEAD
=======

>>>>>>> c29d3718cccca8ecc10c07314b869d082fd5e839

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

  // captureScreen() {
  //   var data = document.getElementById('toPdf');
  //   html2canvas(data).then(canvas => {
  //     // Few necessary setting options  
  //     var pdf = new jspdf('p', 'pt', 'letter');

  //           for (var i = 0; i <= data.clientHeight/980; i++) {
  //               //! This is all just html2canvas stuff
  //               var srcImg  = canvas;
  //               var sX      = 0;
  //               var sY      = 980*i; // start 980 pixels down for every new page
  //               var sWidth  = 900;
  //               var sHeight = 980;
  //               var dX      = 0;
  //               var dY      = 0;
  //               var dWidth  = 900;
  //               var dHeight = 980;

  //               window.onePageCanvas = document.createElement("canvas");
  //               onePageCanvas.setAttribute('width', 900);
  //               onePageCanvas.setAttribute('height', 980);
  //               var ctx = onePageCanvas.getContext('2d');
  //               // details on this usage of this function: 
  //               // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
  //               ctx.drawImage(srcImg,sX,sY,sWidth,sHeight,dX,dY,dWidth,dHeight);

  //               // document.body.appendChild(canvas);
  //               var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

  //               var width         = onePageCanvas.width;
  //               var height        = onePageCanvas.clientHeight;

  //               //! If we're on anything other than the first page,
  //               // add another page
  //               if (i > 0) {
  //                   pdf.addPage(612, 791); //8.5" x 11" in pts (in*72)
  //               }
  //               //! now we declare that we're working on that page
  //               pdf.setPage(i+1);
  //               //! now we add content to that page!
  //               pdf.addImage(canvasDataURL, 'PNG', 20, 40, (width*.62), (height*.62));

  //           }
  //           //! after the for loop is finished running, we save the pdf.
  //           pdf.save('Test.pdf');
  //   });
  // } 
}
