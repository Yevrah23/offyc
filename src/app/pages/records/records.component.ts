import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SubmitProposalComponent } from 'src/app/modal/submit-proposal/submit-proposal.component';
import { ViewPorposalComponent } from 'src/app/modal/view-porposal/view-porposal.component';
import { FileDetailsComponent } from 'src/app/modal/file-details/file-details.component';
import { HttpClient } from '@angular/common/http';
import { UserServices } from 'src/app/services/user_services';
import { CookieService } from 'ngx-cookie-service';

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

  // mat-table
  displayedColumns: string[] = ['id', 'name', 'username', 'settings'];
  dataSource: MatTableDataSource<any>;

  // data tables
  dataTable: any;

  // table data sample
  records: any[];
  CITC:any[];
  COT:any[];
  CEA:any[];
  CSM:any[];
  CSTE:any[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  // tslint:disable-next-line:max-line-length
  constructor(public dialog: MatDialog, private http: HttpClient, private chRef: ChangeDetectorRef, private user: UserServices, private cookies: CookieService) {

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

  viewProposal(data): void {
    this.user.get_proposal(data).subscribe(
      (response) => {
        this.user.tempo = response;
        if (this.user.tempo.proposal_status == 2 || this.user.tempo.proposal_status == 1){
          this.user.approved = true;
          this.user.pending = false;
          console.log(this.user.approved);
        }
        

        const dialogRef = this.dialog.open(ViewPorposalComponent, {
          width: '768px'
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
    // this.user.get_des_proposals().subscribe(
    //   (response)=>{
    //     if (response[0]){
    //       this.CITC = response[1].CITC;
    //       this.COT  = response[1].COT;
    //       this.CEA  = response[1].CEA;
    //       this.CSM  = response[1].CSM;
    //       this.CSTE  = response[1].CSTE;
    //     }
    //     console.log(this.CITC);
    //     console.log(this.COT);
    //     console.log(this.CEA);
    //     console.log(this.CSM);
    //     console.log(this.CSTE);

    //     this.chRef.detectChanges();
    //     // User
    //     // Display data tables
    //     // user
    //     const table: any = $('table');
    //     this.dataTable = table.dataTable();
    //   }
    // )
    this.http.get('https://jsonplaceholder.typicode.com/users')
      .subscribe((data: any[]) => {
        // this.records = data;
        this.dataSource = new MatTableDataSource(data); // for mat-table

        // mat table
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        // this.chRef.detectChanges();
        // Display data tables
        // const table: any = $('table');
        // this.dataTable = table.dataTable();
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
