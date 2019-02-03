import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  fromReg: boolean;
  fromProposal: boolean;
  fromProfileSettingsSave: boolean;
  fromProfileSettingsDelete: boolean;
  test: boolean;

  constructor(
    public dialogRef: MatDialogRef<SuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // check which template to display.
    if (this.data.page === 'fromReg' ) {
      this.fromReg = true;
    } else if (this.data.page === 'fromProposal') {
      this.fromProposal = true;
    } else if (this.data.page === 'fromProfileSettingsSave') {
      this.fromProfileSettingsSave = true;
    } else if (this.data.page === 'fromProfileSettingsDelete') {
      this.fromProfileSettingsDelete = true;
    } else {
      this.test = true;
    }
   }

  ngOnInit() {
  }

}
