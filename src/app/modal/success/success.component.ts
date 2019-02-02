import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  fromReg: boolean;
  fromProfileSettings: boolean;
  test: boolean;

  constructor(
    public dialogRef: MatDialogRef<SuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // check which template to display.
    if (this.data.page === 'fromReg' ) {
      this.fromReg = true;
    } else if (this.data.page === 'fromProfileSettings') {
      this.fromProfileSettings = true;
    } else {
      this.test = true;
    }
   }

  ngOnInit() {
  }

}
