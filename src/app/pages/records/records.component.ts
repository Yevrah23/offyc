import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SubmitProposalComponent } from 'src/app/modal/submit-proposal/submit-proposal.component';

declare var $;
@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {

  isAdmin = true;
  isUser = false;
  // Admin
    // data tables
  @ViewChild('dataTableCOT') tableCOT: ElementRef;
  dataTableCOT: any;
  @ViewChild('dataTableCSM') tableCSM: ElementRef;
  dataTableCSM: any;
  @ViewChild('dataTableCITC') tableCITC: ElementRef;
  dataTableCITC: any;
  @ViewChild('dataTableCSTE') tableCSTE: ElementRef;
  dataTableCSTE: any;
  @ViewChild('dataTableCEA') tableCEA: ElementRef;
  dataTableCEA: any;

  // USER
    // data tables
  @ViewChild('user') tableUser: ElementRef;
  user: any;

  constructor( public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(SubmitProposalComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  ngOnInit(): void {

    // User
      // Display data tables
      // COT
    this.user = $(this.tableUser.nativeElement);
    this.user.dataTable();

    // Admin
      // Display data tables
        // COT
    this.dataTableCOT = $(this.tableCOT.nativeElement);
    this.dataTableCOT.dataTable();
      // CSM
    this.dataTableCSM = $(this.tableCSM.nativeElement);
    this.dataTableCSM.dataTable();
      // CITC
    this.dataTableCITC = $(this.tableCITC.nativeElement);
    this.dataTableCITC.dataTable();
      // CSTE
    this.dataTableCSTE = $(this.tableCSTE.nativeElement);
    this.dataTableCSTE.dataTable();
      // CEA
    this.dataTableCEA = $(this.tableCEA.nativeElement);
    this.dataTableCEA.dataTable();
  }

}
