import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserServices } from 'src/app/services/user_services';
import { SuccessComponent } from '../success/success.component';

@Component({
  selector: 'app-reg-view',
  templateUrl: './reg-view.component.html',
  styleUrls: ['./reg-view.component.scss']
})
export class RegViewComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RegViewComponent>,
    private user: UserServices,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 

  }

  ngOnInit() {
    console.log(this.data);
  }

  approve_registration(id,status){
    this.user.approve_registration(id,status).subscribe(
      (response) => {
        this.dialogRef.close();
        const dialogRef = this.dialog.open(SuccessComponent, {
          width: '435px',
          panelClass: 'custom-dialog-success',
          data: {
            page: 'frmRegApproval',
            status: response
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          console.log(result);
        });
      }
    )
  }

}
