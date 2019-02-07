import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SuccessComponent } from '../success/success.component';

import * as $ from 'jquery';
import { UserServices } from 'src/app/services/user_services';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {

  editProfile = false;

  id:any;
  email:any;
  c_number:any;
  pass: any;
  update = [];


  // if false input will show
  nameEdit = true;
  nameVal: string;
  passEdit = true;
  emailEdit = true;
  numberEdit = true;
  // if false switch edit button to save
  editNameButton = true;
  saveName = false;
  NameReadOnly: boolean;

  editPassButton = true;
  savePass = false;
  passReadOnly: boolean;

  editEmailButton = true;
  saveEmail = false;
  EmailReadOnly: boolean;

  editNumberButton = true;
  saveNumber = false;
  NumberReadOnly: boolean;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProfileSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private user: UserServices
  ) { 
    this.email = this.data.ui_email;
    this.c_number = this.data.ui_contact_number;
    this.pass = this.data.user_pass;
    this.id = this.data.ui_school_id;
  }

  // Alert Save Settings success
  showSuccess(page: string): void {
    const dialogRef = this.dialog.open(SuccessComponent, {
      width: '435px',
      panelClass: 'custom-dialog-success',
      data: {
        page: page
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
  ngOnInit() {

  }

  // ngIf condition lng ni. if apra display sa input field if e click ang edit.
  edit(detail) {
    if (detail === 'name') {
      this.nameEdit = false;
      this.editNameButton = false;
      this.NameReadOnly = false;
    } else if (detail === 'pass') {
      this.passEdit = false;
      this.editPassButton = false;
      this.passReadOnly = false;
    } else if (detail === 'email') {
      this.emailEdit = false;
      this.editEmailButton = false;
      this.EmailReadOnly = false;
    } else if (detail === 'number') {
      this.numberEdit = false;
      this.editNumberButton = false;
      this.NumberReadOnly = false;
    } else if (detail === 'saveName') { // for button edit, save Condition.
      this.editNameButton = true;
      const name = $('input[name="nameVal"]').val();
      if (name === '') {
        this.nameEdit = true;
      } else {
        this.NameReadOnly = true;
      }
    } else if (detail === 'savePass') { // for button edit, save Condition.
      this.editPassButton = true;
      const name = $('input[name="passVal"]').val();
      if (name === '') {
        this.passEdit = true;
      } else {
        this.passReadOnly = true;
        this.pass = name;
      }
    } else if (detail === 'saveEmail') { // dor button edit, save Condition.
      this.editEmailButton = true;
      const name = $('input[name="emailVal"]').val();
      if (name === '') {
        this.emailEdit = true;
      } else {
        this.EmailReadOnly = true;
        this.email = name;
      }
    } else if (detail === 'saveNumber') { // dor button edit, save Condition.
      this.editNumberButton = true;
      const name = $('input[name="numberVal"]').val();
      if (name === '') {
        this.numberEdit = true;
      } else {
        this.NumberReadOnly = true;
        this.c_number = name
      }
    }
  }

  // dri butang ang code sa pag save sa settings
  saveSettings() {
    this.update.push(
      {
        'id': this.id,
        'email': this.email,
        'c_number': this.c_number,
        'pass': this.pass
      }
    );
    console.log(this.update);
    this.user.update_profile(this.update).subscribe(
      (response) => {
        console.log(response);
        if (response){
          this.dialogRef.close(true);
          const page = 'fromProfileSettingsSave'; // para makita asa na page ang gkan g click ang  success na dialog, para dynamic ang success na modal.
          this.showSuccess(page);
        }
      }
    );
    
    // tslint:disable-next-line:max-line-length

  }

  deleteAccount() {
    // tslint:disable-next-line:max-line-length
    const page = 'fromProfileSettingsDelete'; // para makita asa na page ang gkan g click ang  success na dialog, para dynamic ang success na modal.
    this.showSuccess(page);
  }
}
