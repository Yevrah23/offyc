import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { HttpClient, HttpHeaders, HttpEventType, HttpResponse} from '@angular/common/http';
import { UserServices } from 'src/app/services/user_services';
import { UploadService } from 'src/app/services/upload.service';


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
  proponents: string;
  accre_level: string;
  total_hours: string;
  budget_ustp: string;
  budget_partner: string;

  file: File = null;

  fileName: string;
  files: FileList;
  constructor(public dialogRef: MatDialogRef<SubmitProposalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private cookies: CookieService, private user: UserServices, private http: HttpClient, private upload: UploadService) { }

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
      'filename': this.fileName,
      'partner': this.partner,
      'proponents': this.proponents,
      'accre_level': this.accre_level,
      'total_hours': this.total_hours,
      'budget_ustp': this.budget_ustp,
      'budget_partner': this.budget_partner
      // 'file' : this.files[0]
    });
    this.user.submit_proposal(this.proposal).subscribe(
      (response) => {
        if (response) {
          console.log(response);
          let file = this.files[0];
          console.log(file);

          this.upload.uploadFile(file, 'proposal',this.title)
            .subscribe(
              event => {
                if (event.type == HttpEventType.UploadProgress) {
                  const percentDone = Math.round(100 * event.loaded / event.total);
                  console.log(`File is ${percentDone}% loaded.`);
                } else if (event instanceof HttpResponse) {
                  console.log('File is completely loaded!');
                }
              },
              (err) => {
                console.log("Upload Error:", err);
                this.dialogRef.close('Proposal Successfully Submitted');

              }, () => {
                console.log("Upload done");
                this.dialogRef.close('Proposal Successfully Submitted');
              }
            )
        }
      }
    );
  }

  // upload(){
  //   this.user.file_upload().subscribe(
  //     (response) => {
  //       console.log(response);
  //     }
  //   )
  // }

  getFiles(event) {
    
    // this.file = files.item(0);
    this.files = event.target.files;
    console.log(this.files);
    this.fileName = this.files[0]['name'];
    $('#fileName').val(this.files[0]['name']);
  }


  // selectFile(event) {
  //   this.uploadFile(event.target.files);
  // }


  // uploadFile() {
  //   let file = this.files[0];
  //   console.log(file);

  //   this.upload.uploadFile('http://localhost/codeigniter/api/Users/file_upload', file,this.proposal)
  //     .subscribe(
  //       event => {
  //         if (event.type == HttpEventType.UploadProgress) {
  //           const percentDone = Math.round(100 * event.loaded / event.total);
  //           console.log(`File is ${percentDone}% loaded.`);
  //         } else if (event instanceof HttpResponse) {
  //           console.log('File is completely loaded!');
  //         }
  //       },
  //       (err) => {
  //         console.log("Upload Error:", err);
  //         this.dialogRef.close('Proposal Successfully Submitted');

  //       }, () => {
  //         console.log("Upload done");
  //         this.dialogRef.close('Proposal Successfully Submitted');
  //       }
  //     )
  // }

}


