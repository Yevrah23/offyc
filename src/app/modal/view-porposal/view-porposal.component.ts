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
  approved: boolean;
  pending: boolean;
  params = [];
  isLinear = false;

  constructor(
    public dialogRef: MatDialogRef<ViewPorposalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ,private user: UserServices) { 
    }

  ngOnInit() {
    if(this.data.data.proposal_status == "0"){
      this.pending = true;
    }else{
      this.approved = true;
    }
  }

  verdict(data){
    this.params.push({
      'id' :this.data.data.proposal_id,
      'decision': data,
      'title':this.data.data.proposal_title
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
