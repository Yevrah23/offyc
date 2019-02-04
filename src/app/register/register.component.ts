import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserServices } from '../services/user_services';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SuccessComponent } from '../modal/success/success.component';


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
  fName: string;
  mName: string;
  lName: string;
  bDay: string;
  gender: string;
  cNumber: string;
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
    public dialog: MatDialog,
    private user: UserServices,
    private router: Router,
    private _formBuilder: FormBuilder
  ) {}

// Alert register success
showSuccess(page): void {
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
    // Angular form validation
    this.firstFormGroup = this._formBuilder.group({
      firstUserName: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10)]],
      firstPass: ['', [Validators.required, Validators.minLength(6)]],
      firstPassConfirm: ['', [Validators.required, Validators.minLength(6)]],
      firstEmail: ['', [Validators.required, Validators.email]]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondPosition: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdFname: ['', Validators.required],
      thirdMname: ['', Validators.required],
      thirdLname: ['', Validators.required],
      thirdBday: ['', Validators.required],
      thirdGender: ['', Validators.required],
      thirdCnumber: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]],
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
        'fName' : this.fName,
        'mName' : this.mName,
        'lName' : this.lName,
        'bDay' : this.bDay,
        'gender' : this.gender,
        'cNumber' : this.cNumber
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
          const page = 'fromReg'; // para makita asa na page ang gkan g click ang  success na dialog, para dynamic ang success na modal.
          this.router.navigate(['/', 'login']);
          this.showSuccess(page);
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
