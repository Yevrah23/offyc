import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserServices } from '../services/user_services';
import { Router } from '@angular/router';


export interface College { // interface holds data with in array. data types
  name: string;
  detail: string;
}

export interface Department { // interface holds data with in array. data types
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
  // stepper
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

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

  // Selecting College validation and data
  collegeControl = new FormControl('', [Validators.required]);
  selectCollegeFormControl = new FormControl('', Validators.required);
  college: College[] = [
    { name: 'CITC', detail: 'College of Information Technology and Communication' },
    { name: 'CEA', detail: 'College of Engineering and Architecture' },
    { name: 'CSM', detail: 'College of Information Technology and Communication' },
    { name: 'COT', detail: 'College of Information Technology and Communication' },
    { name: 'CSTE', detail: 'College of Information Technology and Communication' }
  ];

  // Selecting department validation and data
  departmentControl = new FormControl('', [Validators.required]);
  selectDepartmentFormControl = new FormControl('', Validators.required);
  department: Department[];



  constructor(
    private user: UserServices,
    private router: Router,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  register() {
    this.data.push(
      {
        'id': this.username,
        'pass': this.password,
        'email': this.email,
        'position': this.position,
        'college': this.coll.name,
        'dept': this.dept.name,
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
      this.department = [
        { name: 'IT', detail: 'Information Technonology' },
        { name: 'TCM', detail: 'Techonology of Communication Management' },
        { name: 'CpE', detail: 'Computer Engineering' },
        { name: 'DS', detail: 'Data Science' }
      ];
    } else if (this.coll.name === 'CEA') {
      this.show = true;
      this.department = [
        { name: 'ARCH', detail: 'Architecture' },
        { name: 'CE', detail: ' Civil Engineering' },
        { name: 'EE', detail: 'Electrical Engineering' },
        { name: 'ECE', detail: 'Electronics Engineering' },
        { name: 'ME', detail: 'Mechanical Engineering' }
      ];
    } else if (this.coll.name === 'CSM') {
      this.show = true;
      this.department = [
        { name: 'Applied Mathematics', detail: 'Applied Mathematics' },
        { name: 'Applied Physics', detail: ' Applied Physics' },
        { name: 'Chemistry ', detail: 'Chemistry ' },
        { name: 'Environmental Science', detail: 'Environmental Science' },
        { name: 'Food Technology', detail: 'Food Technology' }
      ];
    } else if (this.coll.name === 'COT') {
      this.show = true;
      this.department = [
        { name: 'AMT', detail: 'Automotive Mechanical Technology' },
        { name: 'ETM', detail: 'Electrical and Technology Management' },
        { name: 'EMT ', detail: 'Electro-Mechanical Technology' },
        { name: 'ECT', detail: 'Electronics and Communication Technology' }
      ];
    } else if (this.coll.name === 'CSTE') {
      this.show = true;
      this.department = [
        { name: 'BEEd-SpEd', detail: 'Education, Major in Special Education' },
        { name: 'PA', detail: 'Public Administration' },
        { name: 'MathEd ', detail: 'Mathematics Education' },
        { name: 'SciED', detail: 'Sciences Education' },
        { name: 'TLED', detail: 'Technolgy and Livelyhood Education' },
        { name: 'TTE', detail: 'Technical Teacher Education' },
      ];
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
