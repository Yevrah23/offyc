import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SubmitProposalComponent } from 'src/app/modal/submit-proposal/submit-proposal.component';
import { HttpClient } from '@angular/common/http';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserServices } from 'src/app/services/user_services';


@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {

  isAdmin = true;
  isUser = false;

  // data tables
  dataTable: any;

  // table data sample
  records: any[];


  constructor(public dialog: MatDialog, private http: HttpClient , private chRef: ChangeDetectorRef, private user: UserServices) { 
    this.isAdmin = this.user.admin;
    this.isUser = this.user.user;
    console.log(this.user.admin);
    console.log(this.user.user);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SubmitProposalComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  ngOnInit() {

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
