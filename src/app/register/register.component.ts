import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { UserServices } from '../services/user_services';
import { Router } from '@angular/router';


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
  coll: any;
  data = [];
  show: Boolean = false;
  reg: Boolean = false;

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


  constructor( private user: UserServices, private router: Router) { }

  ngOnInit() {

  }

  register() {
    this.data.push(
      {
        'id' : this.username,
        'pass' : this.password,
        'email' : this.email,
        'position' : this.position,
        'college' : this.coll.name,
        'dept' : this.dept.name,
      }
    );
    this.user.register(this.data).subscribe(
      (response) => {
        console.log(response);
        this.data = [];
        if (response === 0) {
          // if (response == 0) {
            console.log('Username Taken');
          } else if (response === 1) {
            console.log('Registered');
            this.router.navigate(['/', 'login']);
          } else {
            console.log('Error');
          }
        // }
      }
    );
  }


  selectedCollege() {
    console.log(this.coll.name);
    if (this.coll.name === 'CITC') {
      this.show = true;
    } else {
      this.show = false;
    }
  }


  passCheck() {
    if (this.password === this.confirmP) {
      this.reg = true;
    } else {
      this.reg = false;

    }
  }

}
