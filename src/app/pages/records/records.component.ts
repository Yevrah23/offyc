import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SubmitProposalComponent } from 'src/app/modal/submit-proposal/submit-proposal.component';
import { HttpClient } from '@angular/common/http';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserServices } from 'src/app/services/user_services';
import { CookieService } from 'ngx-cookie-service';
import { ViewPorposalComponent } from 'src/app/modal/view-porposal/view-porposal.component';


@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {

  isAdmin = true;
  isUser = true;
  token: any;


  // data tables
  dataTable: any;

  // table data sample
  records: any[];
  CITC:any[];
  COT:any[];
  CEA:any[];
  CSM:any[];
  CSTE:any[];


  // tslint:disable-next-line:max-line-length
  constructor(public dialog: MatDialog, private http: HttpClient , private chRef: ChangeDetectorRef, private user: UserServices, private cookies: CookieService) {

  }

  submitProposal(): void {
    const dialogRef = this.dialog.open(SubmitProposalComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  viewProposal(): void {
    const dialogRef = this.dialog.open(ViewPorposalComponent, {
      width: '768px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  ngOnInit() {
    this.token = this.cookies.get('set');
    if (this.token === '1') {
      this.isUser = false;
    } else {
      this.isAdmin = false;
    }
    this.user.get_des_proposals().subscribe(
      (response)=>{
        if (response[0]){
          this.CITC = response[1].CITC;
          this.COT  = response[1].COT;
          this.CEA  = response[1].CEA;
          this.CSM  = response[1].CSM;
          this.CSTE  = response[1].CSTE;
        }
        console.log(this.CITC);
        console.log(this.COT);
        console.log(this.CEA);
        console.log(this.CSM);
        console.log(this.CSTE);

        this.chRef.detectChanges();
        // User
        // Display data tables
        // user
        const table: any = $('table');
        this.dataTable = table.dataTable();
      }
    )
  }

  loadTable() {
    console.log('table loaded');
    this.chRef.detectChanges();
    const table: any = $('table');
    this.dataTable = table.dataTable();
  }

}
