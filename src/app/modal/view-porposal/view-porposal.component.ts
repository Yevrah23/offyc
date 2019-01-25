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
  approved: boolean;
  pending: boolean;
  params = [];

  constructor(
    public dialogRef: MatDialogRef<ViewPorposalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ,private user: UserServices) { 
      this.tempo = this.user.tempo;
      this.approved = this.user.approved;
      this.pending = this.user.pending;
    }

  ngOnInit() {
    console.log(this.tempo);
  }

  verdict(data){
    this.params.push({
      'id' : this.tempo.proposal_id,
      'decision': data,
      'title': this.tempo.proposal_title
    });
    this.user.proposal_approval(this.params).subscribe(
      (response) => {
        if (response){
          this.user.get_proposals().subscribe(
            (result) => {
              console.log(result)
              this.dialogRef.close(result);
              if (data == 1) {
                console.log('Proposal Successfully Approved');
              } else {
                console.log('Proposal Successfully Denied');
              }
            });
        }
      }
    );
  }

}
