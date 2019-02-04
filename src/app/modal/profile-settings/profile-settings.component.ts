import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WarningDownloadComponent } from '../warning-download/warning-download.component';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {

  edit: boolean = false;

  Fname: string;
  Lname: string;
  Mname: string;
  age: string;
  birthday: string;
  college: string;
  contact_number: string;
  dept: string;
  email: string;
  gender: string;
  id: string;
  position: string;
  school_id: string;
  pass: string;




  constructor(
    public dialogRef: MatDialogRef<ProfileSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
   this.Fname= this.data.ui_Fname;
   this.Lname= this.data.ui_Lname;
   this.Mname= this.data.ui_Mnam;
   this.age= this.data.ui_age;
   this.birthday= this.data.ui_birthday;
   this.college= this.data.ui_college;
   this.contact_number=this.data.ui_contact_number;
   this.dept= this.data.ui_dept;
   this.email= this.data.ui_email;
   this.gender= this.data.ui_gender;
   this.id= this.data.ui_id;
   this.position= this.data.ui_position;
   this.school_id= this.data.ui_school_id;
   this.pass= this.data.user_pass;

    console.log(this.birthday);
    console.log(this.email);
    console.log(this.contact_number);
  }

  edit_profile(){
    if(!this.edit){
      this.edit = !this.edit;
    }else{
      console.log('done');
    }
  }

}
