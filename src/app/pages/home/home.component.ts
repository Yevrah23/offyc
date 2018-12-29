import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('dataTable') table: ElementRef;
  dataTable: any;
  constructor() { }

  ngOnInit(): void {
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.dataTable();
  }

}
