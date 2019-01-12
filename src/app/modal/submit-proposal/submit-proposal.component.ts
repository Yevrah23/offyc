import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UserServices } from 'src/app/services/user_services';

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
  file: File = null;

  fileName: string;
  files: FileList;
  constructor(public dialogRef: MatDialogRef<SubmitProposalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private cookies: CookieService, private user: UserServices) { }

  ngOnInit() {

  }

  save() {
    this.proposal = [];
    this.proposal.push({
      'title': this.title,
      'date_start': this.sdate,
      'date_end': this.edate,
      'b_target': this.beneficiary,
      'b_gender': this.bene_gender,
      'venue': this.venue,
      'token': this.cookies.get(this.cookies.get('id')),
      'file': this.file
    });
    this.user.submit_proposal(this.proposal).subscribe(
      (response) => {
        if (response) {
          this.dialogRef.close('Proposal Successfully Submitted');
        }
      }
    );
    // this.upload();
  }

  // upload(){
  //   this.user.file_upload().subscribe(
  //     (response) => {
  //       console.log(response);
  //     }
  //   )
  // }

  getFiles(event, files: FileList) {
    this.file = files.item(0);
    this.files = event.target.files;
    this.fileName = this.files[0]['name'];
    $('#fileName').val(this.files[0]['name']);
  }

}
