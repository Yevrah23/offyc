import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ViewPorposalComponent } from 'src/app/modal/view-porposal/view-porposal.component';
import { GenerateReportComponent } from 'src/app/modal/generate-report/generate-report.component';

import * as $ from 'jquery';

@Component({
  selector: 'app-assesment',
  templateUrl: './assesment.component.html',
  styleUrls: ['./assesment.component.scss']
})
export class AssesmentComponent implements OnInit {

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

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private chRef: ChangeDetectorRef
  ) { }


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

  viewProposal(): void {
    const dialogRef = this.dialog.open(ViewPorposalComponent, {
      width: '535px',
      panelClass: 'custom-dialog-view'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }


  ngOnInit() {

    // Display data tables
    this.http.get('https://jsonplaceholder.typicode.com/users')
      .subscribe((data: any[]) => {
        this.showSpinner = false;
        this.showData = true;
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
