import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { user_services } from '../services/user_services';
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
  checkP: boolean;
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  confirmP = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);
  //dept = new FormControl('', [Validators.required]);
  department = new FormControl('', [Validators.required]);
  data = [];

  // Selecting department validation and data
  collegeControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  college: Department[] = [
    {name: 'CITC', detail: 'College of Information Technology and Communication' },
    {name: 'CEA', detail: 'College of Engineering and Architecture' },
    {name: 'CITC', detail: 'College of Information Technology and Communication' }
  ];

  constructor( private user : user_services) { }

  ngOnInit() {
  }

  passwordCheck(){
    if (this.password != this.confirmP){
      this.checkP = false;
    }else{
      this.checkP = true;
      console.log('match');
    }
  }

  register(){
    this.data.push(
      {
        'username' : this.username,
        'password' : this.password,
        'email' : this.email,
        'college' : this.collegeControl,
        'department' : this.department
      }
    )
    console.log(this.data);
  }

}
