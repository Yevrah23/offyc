import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ViewPorposalComponent } from 'src/app/modal/view-porposal/view-porposal.component';
import { GenerateReportComponent } from 'src/app/modal/generate-report/generate-report.component';

import * as $ from 'jquery';
import { UserServices } from 'src/app/services/user_services';
import { RegViewComponent } from 'src/app/modal/reg-view/reg-view.component';

@Component({
  selector: 'app-assesment',
  templateUrl: './assesment.component.html',
  styleUrls: ['./assesment.component.scss']
})
export class AssesmentComponent implements OnInit {

  // table data sample
  records: any[];
  proposals: any[];



  // records: any[];
  // spinner
  showSpinner = true;
  showData = false;
  // mat-table
  proposalColumns: string[] = ['Title', 'Target', 'Venue', 'Settings'];
  Report: string[] = ['Title', 'Target', 'Venue', 'Settings'];
  userRequest: string[] = ['ui_school_id', 'fullName', 'colDept', 'Settings'];

  proposal: MatTableDataSource<any>;
  report: MatTableDataSource<any>;
  unregistered: MatTableDataSource<any>;
  record: any;

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('proposalSort') proposalSort: MatSort;
  @ViewChild('proposalPaginator') proposalPaginator: MatPaginator;

  // report
  @ViewChild('reportSort') reportSort: MatSort;
  @ViewChild('reportPaginator') reportPaginator: MatPaginator;

  // user request
  @ViewChild('userSort') sortUser: MatSort;
  @ViewChild('userPaginator') userPaginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private chRef: ChangeDetectorRef,
    private user: UserServices
  ) { }


  // Modal triggers
  generateReport(): void {
    const dialogRef = this.dialog.open(GenerateReportComponent, {
      disableClose: true,
      width: '535px',
      panelClass: 'custom-dialog-report'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  viewProposal(data): void {
    this.user.get_proposal(data).subscribe(
      (response) => {
        this.record = response;

        this.record.proposal_date_start = this.record.proposal_date_start.substring(0, 10);
        this.record.proposal_date_end = this.record.proposal_date_end.substring(0, 10);


        const dialogRef = this.dialog.open(ViewPorposalComponent, {
          disableClose: true,
          width: '1000px',
          panelClass: 'custom-dialog-view',
          data: {
            data: this.record,
            admin: true
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.get_proposals();

        });
      });
  }

  // Registration Request View  modal if e click ang name ug user id.
  regRequest(record): void {
    const dialogRef = this.dialog.open(RegViewComponent, {
      disableClose: true,
      width: '535px',
      panelClass: 'custom-dialog-regRequest',
      data: record
    });

    dialogRef.afterClosed().subscribe(result => {
      this.get_unregistered();
    });
  }


  ngOnInit() {
    this.get_unregistered();
    this.get_proposals();
  }

  get_unregistered() {
    this.user.get_unregistered().subscribe(
      (response) => {
        this.showSpinner = false;
        this.showData = true;
        console.log(response);

        if (response[0]) {
          this.records = response[1];
          response[1].forEach(element => {
            element.fullName = `${element.ui_Lname}, ${element.ui_Fname}  ${element.ui_Mname}`;
            element.colDept = `${element.ui_college} - ${element.ui_dept}`;
          });
          this.unregistered = new MatTableDataSource(response[1]); // for mat-table
          this.unregistered.paginator = this.userPaginator;
          this.unregistered.sort = this.sortUser;
        } else {
          this.unregistered = null; // for mat-table
        }

      });
  }

  get_proposals() {
    this.user.get_proposals().subscribe(
      (response) => {
        this.showSpinner = false;
        this.showData = true;
        console.log(response);

        if (response[0]) {
          this.proposal = new MatTableDataSource(response[1]); // for mat-table
          this.proposal.paginator = this.proposalPaginator;
          this.proposal.sort = this.proposalSort;
        } else {
          this.proposal = null; // for mat-table
        }
        console.log(this.proposal);

      });
  }

  // fixed for matSort not working if using ngIf on table
  // @ViewChild(MatSort) set matSort(ms: MatSort) { // unregistered
  //   this.sortUnregistered = ms;
  //   this.setDataSourceAttributes();
  // }
  // setDataSourceAttributes() {
  //   this.unregistered.sort = this.sortUnregistered;
  // }

  // search table proposal
  applyFilterProp(filterValue: string) {
    this.proposal.filter = filterValue.trim().toLowerCase();

    if (this.proposal.paginator) {
      this.proposal.paginator.firstPage();
    }
  }

  // search table report
  applyFilterRep(filterValue: string) {
    this.report.filter = filterValue.trim().toLowerCase();

    if (this.report.paginator) {
      this.report.paginator.firstPage();
    }
  }

  // search table user request
  applyFilterUserReq(filterValue: string) {
    this.unregistered.filter = filterValue.trim().toLowerCase();

    if (this.unregistered.paginator) {
      this.unregistered.paginator.firstPage();
    }
  }

}
