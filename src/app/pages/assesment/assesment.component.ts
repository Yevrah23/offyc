import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

declare var $;
@Component({
  selector: 'app-assesment',
  templateUrl: './assesment.component.html',
  styleUrls: ['./assesment.component.scss']
})
export class AssesmentComponent implements OnInit {

  // data tables
  @ViewChild('dataTableCOT') tableCOT: ElementRef;
  dataTableCOT: any;
  @ViewChild('dataTableCSM') tableCSM: ElementRef;
  dataTableCSM: any;
  @ViewChild('dataTableCITC') tableCITC: ElementRef;
  dataTableCITC: any;
  @ViewChild('dataTableCSTE') tableCSTE: ElementRef;
  dataTableCSTE: any;
  @ViewChild('dataTableCEA') tableCEA: ElementRef;
  dataTableCEA: any;

  constructor() { }

  ngOnInit(): void {

    // Display data tables
      // COT
      this.dataTableCOT = $(this.tableCOT.nativeElement);
      this.dataTableCOT.dataTable();
        // CSM
      this.dataTableCSM = $(this.tableCSM.nativeElement);
      this.dataTableCSM.dataTable();
        // CITC
      this.dataTableCITC = $(this.tableCITC.nativeElement);
      this.dataTableCITC.dataTable();
        // CSTE
      this.dataTableCSTE = $(this.tableCSTE.nativeElement);
      this.dataTableCSTE.dataTable();
        // CEA
      this.dataTableCEA = $(this.tableCEA.nativeElement);
      this.dataTableCEA.dataTable();

  }

}
