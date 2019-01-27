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
  // table data sample
  // records: any[];

  // spinner
  showSpinner = true;
  showData = false;
  // mat-table
  displayedColumns: string[] = ['id', 'name', 'username', 'settings'];
  dataSource: MatTableDataSource<any>;

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

  viewProposal(): void {
    const dialogRef = this.dialog.open(ViewPorposalComponent, {
      width: '100px',
      panelClass: 'custom-dialog-view'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
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
    this.http.get('https://jsonplaceholder.typicode.com/users')
      .subscribe((data: any[]) => {
        this.showSpinner = false;
        this.showData = true;
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
