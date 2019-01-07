import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-assesment',
  templateUrl: './assesment.component.html',
  styleUrls: ['./assesment.component.scss']
})
export class AssesmentComponent implements OnInit {

  // data tables
  dataTable: any;

  // table data sample
  records: any[];

  constructor(private http: HttpClient, private chRef: ChangeDetectorRef) { }

  ngOnInit() {

    // Display data tables
    this.http.get('https://jsonplaceholder.typicode.com/users')
      .subscribe((data: any[]) => {
        this.records = data;

        this.chRef.detectChanges();
        // User
        // Display data tables
        // user
        const table: any = $('table');
        this.dataTable = table.dataTable();
      });
  }

  loadTable() {
    console.log('table loaded');
    this.chRef.detectChanges();
    const table: any = $('table');
    this.dataTable = table.dataTable();
  }

}
