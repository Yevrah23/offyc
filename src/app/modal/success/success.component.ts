import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  fromReg: boolean;
  test: boolean;

  constructor(
    public dialogRef: MatDialogRef<SuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data.page === 'fromReg' ) {
      this.fromReg = true;
    } else {
      this.test = true;
    }
   }

  ngOnInit() {
  }

}
