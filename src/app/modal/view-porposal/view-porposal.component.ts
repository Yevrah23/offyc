import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { UserServices } from 'src/app/services/user_services';

@Component({
  selector: 'app-view-porposal',
  templateUrl: './view-porposal.component.html',
  styleUrls: ['./view-porposal.component.scss']
})
export class ViewPorposalComponent implements OnInit {
  tempo: any;

  constructor(
    public dialogRef: MatDialogRef<ViewPorposalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ,private user: UserServices) { 
      this.tempo = this.user.tempo;
    }

  ngOnInit() {
    console.log(this.tempo);
  }

}
