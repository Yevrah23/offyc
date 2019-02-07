import { Component, OnInit, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SubmitProposalComponent } from 'src/app/modal/submit-proposal/submit-proposal.component';
import { ViewPorposalComponent } from 'src/app/modal/view-porposal/view-porposal.component';
import { FileDetailsComponent } from 'src/app/modal/file-details/file-details.component';
import { HttpClient } from '@angular/common/http';
import { UserServices } from 'src/app/services/user_services';
import { CookieService } from 'ngx-cookie-service';
import { DataSpinnerComponent } from 'src/app/loading/data-spinner/data-spinner.component';

import * as $ from 'jquery';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {


  isAdmin = false;
  isUser = false;
  token: any;

  // tempo: any;

  // table data sample
  // records: any[];

  // spinner
  adminSpinner = true;
  showSpinner: boolean;
  showData = false;
  // mat-table
  displayedColumns: string[] = ['Title', 'Target', 'Venue', 'Settings'];
  archiveColumns: string[] = ['Title', 'Target', 'Venue', 'Settings'];
  CITC: MatTableDataSource<any>;
  COT: MatTableDataSource<any>;
  CEA: MatTableDataSource<any>;
  CSM: MatTableDataSource<any>;
  CSTE: MatTableDataSource<any>;
  ARCHIVE: MatTableDataSource<any>;

  User: MatTableDataSource<any>;

  // data tables
  record: any;

  // table data sample
  records: any[];
  // CITC:any[];
  // COT:any[];
  // CEA:any[];
  // CSM:any[];
  // CSTE:any[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // tslint:disable-next-line:max-line-length
  constructor(public dialog: MatDialog, private http: HttpClient, private chRef: ChangeDetectorRef, private user: UserServices, private cookies: CookieService) {

  }


  // Modal triggers
  submitProposal(userAdmin): void {
    const dialogRef = this.dialog.open(SubmitProposalComponent, {
      width: '500px',
      data : {
        userType: userAdmin // string ni
      }
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
            admin: this.isAdmin,
            user: this.isUser
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          console.log(result);
        });
      }
    );

  }

  fileDetails(): void {
    const dialogRef = this.dialog.open(FileDetailsComponent, {
      width: '439px',
      panelClass: 'custom-dialog-file'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngDoCheck() {
    if (this.user.user || this.user.admin) {
      if (this.user.admin) {
        this.isAdmin = true;
      } else {
        this.isUser = true;
      }
      this.adminSpinner = false;
    }
  }

  ngOnInit() {

    setTimeout(() => {
      this.showSpinner = true;
      this.check_proposal();
    }, 1000);
  }


  check_proposal() {
    // this.showSpinner = true;
    if (this.isAdmin) {
      this.user.get_des_proposals().subscribe(
        (response) => {
          this.showSpinner = false;
          this.showData = true;
          if (response[0]) {
            console.log(response[1]);
            this.CITC = new MatTableDataSource(response[1].CITC);
            this.COT = new MatTableDataSource(response[1].COT);
            this.CEA = new MatTableDataSource(response[1].CEA);
            this.CSM = new MatTableDataSource(response[1].CSM);
            this.CSTE = new MatTableDataSource(response[1].CSTE);
            this.ARCHIVE = new MatTableDataSource(response[1].ARCHIVE);

            // mat table
            this.CITC.paginator = this.paginator;
            this.COT.paginator = this.paginator;
            this.CEA.paginator = this.paginator;
            this.CSM.paginator = this.paginator;
            this.CSTE.paginator = this.paginator;
            this.ARCHIVE.paginator = this.paginator;

            this.CITC.sort = this.sort;
            this.COT.sort = this.sort;
            this.CEA.sort = this.sort;
            this.CSM.sort = this.sort;
            this.CSTE.sort = this.sort;
            this.ARCHIVE.sort = this.sort;
          }
        }
      );
    } else {
      this.user.get_proposals_user(this.cookies.get('id')).subscribe(
        (response) => {
          if (response[0]) {
            this.showSpinner = false;
            this.showData = true;
            console.log(response);
            this.User = new MatTableDataSource(response[1]);


            // mat table
            this.User.paginator = this.paginator;


            this.User.sort = this.sort;
          }
        }
      );
    }
  }

  applyFilter(filterValue: string) {
    this.CITC.filter = filterValue.trim().toLowerCase();
    this.COT.filter = filterValue.trim().toLowerCase();
    this.CSM.filter = filterValue.trim().toLowerCase();
    this.CSTE.filter = filterValue.trim().toLowerCase();
    this.CEA.filter = filterValue.trim().toLowerCase();
    this.ARCHIVE.filter = filterValue.trim().toLowerCase();
    this.User.filter = filterValue.trim().toLowerCase(); // user only

    if (this.CITC.paginator) {
      this.CITC.paginator.firstPage();
    }
    if (this.COT.paginator) {
      this.COT.paginator.firstPage();
    }
    if (this.CSM.paginator) {
      this.CSM.paginator.firstPage();
    }
    if (this.CSTE.paginator) {
      this.CSTE.paginator.firstPage();
    }
    if (this.CEA.paginator) {
      this.CEA.paginator.firstPage();
    }
    if (this.ARCHIVE.paginator) {
      this.CEA.paginator.firstPage();
    }

    if (this.User.paginator) {
      this.User.paginator.firstPage();
    }
  }

}
