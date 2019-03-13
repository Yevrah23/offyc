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
  valid : boolean;

  // tempo: any;

  // table data sample
  // records: any[];

  // spinner
  adminSpinner = true;
  showSpinner: boolean;
  showData = false;
  // mat-table
  userColumns: string[] = ['proposal_title', 'proposal_beneficiaries', 'proposal_venue', 'Settings'];
  citcColumns: string[] = ['proposal_title', 'proposal_beneficiaries', 'proposal_venue', 'Settings'];
  cotColumns: string[] = ['proposal_title', 'proposal_beneficiaries', 'proposal_venue', 'Settings'];
  ceaColumns: string[] = ['proposal_title', 'proposal_beneficiaries', 'proposal_venue', 'Settings'];
  csmColumns: string[] = ['proposal_title', 'proposal_beneficiaries', 'proposal_venue', 'Settings'];
  csteColumns: string[] = ['proposal_title', 'proposal_beneficiaries', 'proposal_venue', 'Settings'];
  archiveColumns: string[] = ['proposal_title', 'proposal_beneficiaries', 'ui_college', 'Settings'];

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

  @ViewChild('userSort') userSort: MatSort;
  @ViewChild('userPaginator') userPaginator: MatPaginator;

  @ViewChild('citcSort') citcSort: MatSort;
  @ViewChild('citcPaginator') citcPaginator: MatPaginator;

  @ViewChild('cotSort') cotSort: MatSort;
  @ViewChild('cotPaginator') cotPaginator: MatPaginator;

  @ViewChild('ceaSort') ceaSort: MatSort;
  @ViewChild('ceaPaginator') ceaPaginator: MatPaginator;

  @ViewChild('csmSort') csmSort: MatSort;
  @ViewChild('csmPaginator') csmPaginator: MatPaginator;

  @ViewChild('csteSort') csteSort: MatSort;
  @ViewChild('cstePaginator') cstePaginator: MatPaginator;

  @ViewChild('archiveSort') archiveSort: MatSort;
  @ViewChild('archivePaginator') archivePaginator: MatPaginator;

  // tslint:disable-next-line:max-line-length
  constructor(public dialog: MatDialog, private http: HttpClient, private chRef: ChangeDetectorRef, private user: UserServices, private cookies: CookieService) {

  }


  // Modal triggers
  submitProposal(userAdmin): void {
    const dialogRef = this.dialog.open(SubmitProposalComponent, {
      disableClose: true,
      width: '500px',
      data: {
        userType: userAdmin // string ni
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result.error.message);
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

  fileDetails(record): void {
    console.log(record);
    const dialogRef = this.dialog.open(FileDetailsComponent, {
      disableClose: true,
      width: '439px',
      panelClass: 'custom-dialog-file',
      data: record
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {

    setTimeout(() => {
      this.showSpinner = true;
      this.check_proposal();
      this.get_archived();
    }, 1500);

    setInterval(()=>{
      if (this.user.user || this.user.admin) {
        if (this.user.admin) {
          this.isAdmin = true;
        } else {
          this.isUser = true;
        }
        this.adminSpinner = false;
      }
    },1000);
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

            // mat table
            this.CITC.paginator = this.citcPaginator;
            this.COT.paginator = this.cotPaginator;
            this.CEA.paginator = this.ceaPaginator;
            this.CSM.paginator = this.csmPaginator;
            this.CSTE.paginator = this.cstePaginator;

            this.CITC.sort = this.citcSort;
            this.COT.sort = this.cotSort;
            this.CEA.sort = this.ceaSort;
            this.CSM.sort = this.csmSort;
            this.CSTE.sort = this.csteSort;
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
            this.User.paginator = this.userPaginator;


            this.User.sort = this.userSort;
          }
        }
      );
    }
  }


  get_archived(){
    this.user.get_archived().subscribe(
      (response: any []) => {
        this.ARCHIVE = new MatTableDataSource(response);
        this.ARCHIVE.paginator = this.archivePaginator;
        this.ARCHIVE.sort = this.archiveSort;
      }
    )
  }

  applyFilter(filterValue: string) {
    this.CITC.filter = filterValue.trim().toLowerCase();
    this.COT.filter = filterValue.trim().toLowerCase();
    this.CSM.filter = filterValue.trim().toLowerCase();
    this.CSTE.filter = filterValue.trim().toLowerCase();
    this.CEA.filter = filterValue.trim().toLowerCase();
    this.ARCHIVE.filter = filterValue.trim().toLowerCase();

    if (this.CITC.paginator) {
      this.CITC.paginator.firstPage();
    }
    else if (this.COT.paginator) {
      this.COT.paginator.firstPage();
    }
    else if (this.CSM.paginator) {
      this.CSM.paginator.firstPage();
    }
    else if (this.CSTE.paginator) {
      this.CSTE.paginator.firstPage();
    }
    else if (this.CEA.paginator) {
      this.CEA.paginator.firstPage();
    }
    else if (this.ARCHIVE.paginator) {
      this.CEA.paginator.firstPage();
    }
  }

  // search table user request
  applyFilterUser(filterValue: string) {
    this.User.filter = filterValue.trim().toLowerCase(); // user only
    // // this.unregistered.filter = filterValue.trim().toLowerCase();

    if (this.User.paginator) {
      this.User.paginator.firstPage();
    }
  }

}
