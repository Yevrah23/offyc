import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { UserServices } from '../services/user_services';
import { HttpClient } from '@angular/common/http';


export interface Department { // interface holds data with in array. data types
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
  dept: string;
  data = [];

  // Selecting department validation and data
  departmentControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  department: Department[] = [
    {name: 'CITC', detail: 'College of Information Technology and Communication' },
    {name: 'CEA', detail: 'College of Engineering and Architecture' },
    {name: 'CITC', detail: 'College of Information Technology and Communication' }
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

}
