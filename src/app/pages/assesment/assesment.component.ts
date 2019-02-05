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
  userRequest: string[] = ['userID', 'name', 'College', 'Settings'];

  dataSource: MatTableDataSource<any>;
  unregistered: MatTableDataSource<any>;
  record: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private chRef: ChangeDetectorRef,
    private user: UserServices
  ) {}


  // Modal triggers
  generateReport(): void {
    const dialogRef = this.dialog.open(GenerateReportComponent, {
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
    


  get_unregistered(){
    this.user.get_unregistered().subscribe(
      (response) => {
        this.showSpinner = false;
        this.showData = true;
        console.log(response);

        if (response[0]) {
          this.unregistered = new MatTableDataSource(response[1]); // for mat-table
          this.unregistered.paginator = this.paginator;
          this.unregistered.sort = this.sort;
        }else{
          this.unregistered = null; // for mat-table
        }

      });
  }

  get_proposals(){
    this.user.get_proposals().subscribe(
      (response) => {
        this.showSpinner = false;
        this.showData = true;
        console.log(response);

        if (response[0]) {
          this.dataSource = new MatTableDataSource(response[1]); // for mat-table
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        else {
          this.dataSource = null; // for mat-table
        }
        console.log(this.dataSource);

      });
  }
  // search table
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
