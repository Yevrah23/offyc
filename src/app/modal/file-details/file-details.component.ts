import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.scss']
})
export class FileDetailsComponent implements OnInit {
  moa: boolean = false;
  report: boolean = false;
  cover: boolean = false;
  proposal:boolean = false;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FileDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    if (this.data.moa_directory.length > 0){
      this.moa = true;
    }

    if (this.data.cover_directory.length > 0) {
      this.cover = true;
    }

    if (this.data.proposal_directory.length > 0) {
      this.proposal = true;
    }

    if (this.data.report_directory.length > 0) {
      this.report = true;
    }

  }

}
