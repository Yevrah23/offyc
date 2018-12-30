import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

declare var $;
@Component({
  selector: 'app-assesment',
  templateUrl: './assesment.component.html',
  styleUrls: ['./assesment.component.scss']
})
export class AssesmentComponent implements OnInit {

  // data tables
  @ViewChild('proposal') tableProposal: ElementRef;
  proposal: any;
  @ViewChild('fileRequest') tableFileRequest: ElementRef;
  fileRequest: any;
  @ViewChild('report') tableReport: ElementRef;
  report: any;

  constructor() { }

  ngOnInit(): void {

    // Display data tables
      // COT
      this.proposal = $(this.tableProposal.nativeElement);
      this.proposal.dataTable();
        // CSM
      this.fileRequest = $(this.tableFileRequest.nativeElement);
      this.fileRequest.dataTable();
        // CITC
      this.report = $(this.tableReport.nativeElement);
      this.report.dataTable();

  }

}
