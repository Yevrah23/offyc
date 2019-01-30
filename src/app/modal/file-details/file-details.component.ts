import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { WarningDownloadComponent } from '../warning-download/warning-download.component';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.scss']
})
export class FileDetailsComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FileDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  showWarning(): void {
    const dialogRef = this.dialog.open(WarningDownloadComponent, {
      width: '435px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
  ngOnInit() {
  }

}
