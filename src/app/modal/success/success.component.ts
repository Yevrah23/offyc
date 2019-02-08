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
  fromLogin = false;
  fromRegApproval = false;
  RegApproval = false;
  loginStatus: any;

  constructor(
    public dialogRef: MatDialogRef<SuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // check which template to display.

   }

  ngOnInit() {
      if (this.data.page === 'fromReg') {
        this.fromReg = true;
      } else if (this.data.page === 'frmLogin') {
        this.fromLogin = true;
        this.loginStatus = this.data.status;
      } else if (this.data.page === 'frmRegApproval') {
        this.RegApproval = this.data.status;
        this.fromRegApproval = true;
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

}
