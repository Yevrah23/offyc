import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { SuccessComponent } from '../success/success.component';

@Component({
  selector: 'app-warning-download',
  templateUrl: './warning-download.component.html',
  styleUrls: ['./warning-download.component.scss']
})
export class WarningDownloadComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<WarningDownloadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  showSuccess(): void {
    const dialogRef = this.dialog.open(SuccessComponent, {
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
