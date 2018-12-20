import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { UserServices } from '../services/user_services';
import { HttpClient } from '@angular/common/http';


export interface College { // interface holds data with in array. data types
  name: string;
  detail: string;
}

export interface Citc { // interface holds data with in array. data types
  name: string;
  detail: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: string;
  password: string;
  confirmP: string;
  email: string;
  position: string;
  dept: any;
  data = [];
  show: Boolean = false;

  // Selecting department validation and data
  collegeControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  college: College[] = [
    {name: 'CITC', detail: 'College of Information Technology and Communication' },
    {name: 'CEA', detail: 'College of Engineering and Architecture' },
    {name: 'CITC', detail: 'College of Information Technology and Communication' }
  ];

   // Selecting department validation and data
   departmentControl = new FormControl('', [Validators.required]);
   selectCollegeFormControl = new FormControl('', Validators.required);
   department: Citc[] = [
     {name: 'IT', detail: 'Information Technonology' },
     {name: 'TCM', detail: 'Techonology of Communication Management' },
     {name: 'CpE', detail: 'Computer Engineering' },
     {name: 'DS', detail: 'Data Science' }
   ];


  constructor( private user: UserServices) { }

  ngOnInit() {

  }

  register() {
    this.data.push(
      {
        'username' : this.username,
        'password' : this.password,
        'email' : this.email,
        'position' : this.position,
        'dept' : this.dept
      }
    );
    console.log(this.data);
  }

  selectedCollege() {
    console.log(this.dept.name);
    if (this.dept.name === 'CITC') {
      this.show = true;
    } else {
      this.show = false;
    }
  }

}
