import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-submit-proposal',
  templateUrl: './submit-proposal.component.html',
  styleUrls: ['./submit-proposal.component.scss']
})
export class SubmitProposalComponent implements OnInit {
  proposal = [];
  title: string;
  sdate: string;
  edate: string;
  beneficiary: string;
  bene_gender: string;
  partner: string;
  venue: string;

  constructor(public dialogRef: MatDialogRef<SubmitProposalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public cookies: CookieService) { }

  ngOnInit() {

  }
  save() {
    this.proposal.push({
      'title' : this.title,
      'date_start' : this.sdate,
      'date_end' : this.edate,
      'b_target' : this.beneficiary,
      'b_gender' : this.bene_gender,
      'venue' : this.venue,
      'trans_type' : this.cookies.get('set') 
    })
    console.log(this.proposal);
  }

}
