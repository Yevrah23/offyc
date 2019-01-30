import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ViewPorposalComponent } from 'src/app/modal/view-porposal/view-porposal.component';
import { GenerateReportComponent } from 'src/app/modal/generate-report/generate-report.component';

import * as $ from 'jquery';
import { UserServices } from 'src/app/services/user_services';

@Component({
  selector: 'app-assesment',
  templateUrl: './assesment.component.html',
  styleUrls: ['./assesment.component.scss']
})
export class AssesmentComponent implements OnInit {

  // table data sample
  records: any[];
  proposals: any[];

  // constructor(private http: HttpClient, private chRef: ChangeDetectorRef, private user: UserServices, public dialog: MatDialog) { }

  // viewProposal(data): void {
  //   this.user.get_proposal(data).subscribe(
  //     (response) => {
  //       this.user.tempo = response;
  //       if (this.user.tempo.proposal_status == 0) {
  //         this.user.approved = false;
  //         this.user.pending = true;
  //         console.log(this.user.approved);
  //       }


  //       const dialogRef = this.dialog.open(ViewPorposalComponent, {
  //         width: '768px'
  //       });

  //       dialogRef.afterClosed().subscribe(result => {
  //         console.log('The dialog was closed');
  //         this.proposals = result[1];
  //         console.log(this.proposals);
  //         this.chRef.detectChanges();
  //         // User
  //         // Display data tables
  //         // user
  //         const table: any = $('table');
  //         this.dataTable = table.dataTable();

  //       });
  //     }
  //   )

  // records: any[];
  // spinner
  showSpinner = true;
  showData = false;
  // mat-table
  proposalColumns: string[] = ['Title', 'Target', 'Venue', 'Settings'];
  Report: string[] = ['Title', 'Target', 'Venue', 'Settings'];
  userRequest: string[] = ['userID', 'name', 'College', 'Settings'];

  dataSource: MatTableDataSource<any>;
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
            data: this.record
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.proposals = result[1];

        });
      });
  }

  // viewProposal(): void {
  //   const dialogRef = this.dialog.open(ViewPorposalComponent, {
  //     width: '535px',
  //     panelClass: 'custom-dialog-view'
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     console.log(result);
  //   });
  // }


  ngOnInit() {
    // this.token = this.cookies.get('set');
    // if (this.token === '1') {
    //   this.isUser = false;
    // } else {
    //   this.isAdmin = false;
    // }
    this.user.get_proposals().subscribe(
      (response) => {
        this.showSpinner = false;
        this.showData = true;
        console.log(response);

        if (response[0]) {
          this.dataSource = new MatTableDataSource(response[1]); // for mat-table
        }
        console.log(this.dataSource);

        // mat table
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        // this.chRef.detectChanges();
        // Display data tables
        // const table: any = $('table');
        // this.dataTable = table.dataTable();
      });
  }

  // fixed for matSort not working if using ngIf on table
  // @ViewChild(MatSort) set matSort(ms: MatSort) {
  //   this.sort = ms;
  //   this.setDataSourceAttributes();
  // }
  // setDataSourceAttributes() {
  //   this.dataSource.sort = this.sort;
  // }


  // search table
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
