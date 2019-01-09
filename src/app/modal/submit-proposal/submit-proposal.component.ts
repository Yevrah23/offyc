import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'app-submit-proposal',
  templateUrl: './submit-proposal.component.html',
  styleUrls: ['./submit-proposal.component.scss']
})
export class SubmitProposalComponent implements OnInit {

  fileName: string;
  files: FileList;
  constructor(public dialogRef: MatDialogRef<SubmitProposalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

  save() {
    this.dialogRef.close('Proposal Submitted');
    // save your data
  }

  getFiles(event) {
    this.files = event.target.files;
    this.fileName = this.files[0]['name'];
    $('#fileName').val(this.files[0]['name']);
  }

}
