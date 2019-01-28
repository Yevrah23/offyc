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

  isAdmin = true;
  isUser = true;
  token: any;
  
  // tempo: any;

  // table data sample
  // records: any[];

  // spinner
  showSpinner = true;
  showData = false;
  // mat-table
  displayedColumns: string[] = ['Title', 'Target', 'Venue', 'Settings'];
  CITC: MatTableDataSource<any>;
  COT: MatTableDataSource<any>;
  CEA: MatTableDataSource<any>;
  CSM: MatTableDataSource<any>;
  CSTE: MatTableDataSource<any>;

  // data tables
  record:any;

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
  submitProposal(): void {
    const dialogRef = this.dialog.open(SubmitProposalComponent, {
      width: '350px'
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
        this.record.proposal_date_end = this.record.proposal_date_end.substring(0,10);

        
        const dialogRef = this.dialog.open(ViewPorposalComponent, {
          width: '1000px',
          panelClass: 'custom-dialog-view',
          data:{
            data : this.record
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          console.log(result);
        });
      }
    )
    
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

  ngOnInit() {
    this.token = this.cookies.get('set');
    if (this.token === '1') {
      this.isUser = false;
    } else {
      this.isAdmin = false;
    }
    this.user.get_des_proposals().subscribe(
      (response)=>{
        this.showSpinner = false;
        this.showData = true;

        if (response[0]){
          console.log(response[1]);
          this.CITC = new MatTableDataSource(response[1].CITC);
          this.COT  = new MatTableDataSource(response[1].COT);
          this.CEA  = new MatTableDataSource(response[1].CEA);
          this.CSM  = new MatTableDataSource(response[1].CSM);
          this.CSTE  = new MatTableDataSource(response[1].CSTE);

          // mat table
          this.CITC.paginator = this.paginator;
          this.COT.paginator = this.paginator;
          this.CEA.paginator = this.paginator;
          this.CSM.paginator = this.paginator;
          this.CSTE.paginator = this.paginator;

          this.CITC.sort = this.sort;
          this.COT.sort = this.sort;
          this.CEA.sort = this.sort;
          this.CSM.sort = this.sort;
          this.CSTE.sort = this.sort;
        }
        console.log(this.CITC);
        console.log(this.COT);
        console.log(this.CEA);
        console.log(this.CSM);
        console.log(this.CSTE);
      }
    )
    // this.http.get('https://jsonplaceholder.typicode.com/users')
    //   .subscribe((data: any[]) => {
    //     // this.records = data;
    //     this.dataSource = new MatTableDataSource(data); // for mat-table

    //     // mat table
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;

    //     // this.chRef.detectChanges();
    //     // Display data tables
    //     // const table: any = $('table');
    //     // this.dataTable = table.dataTable();
    //   });
  }

  // fixed for matSort not working if using ngIf on table
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }
  setDataSourceAttributes() {
    this.CITC.sort = this.sort;
    this.COT.sort = this.sort;
    this.CEA.sort = this.sort;
    this.CSM.sort = this.sort;
    this.CSTE.sort = this.sort;
  }

  // search table
  applyFilter(filterValue: string) {
    this.CITC.filter = filterValue.trim().toLowerCase();
    this.COT.filter = filterValue.trim().toLowerCase();
    this.CSM.filter = filterValue.trim().toLowerCase();
    this.CSTE.filter = filterValue.trim().toLowerCase();
    this.CEA.filter = filterValue.trim().toLowerCase();

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
  }

}
