import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatStepper, MatDialog } from '@angular/material';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { UserServices } from 'src/app/services/user_services';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { UploadService } from 'src/app/services/upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-view-porposal',
  templateUrl: './view-porposal.component.html',
  styleUrls: ['./view-porposal.component.scss']
})
export class ViewPorposalComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;

  approved: boolean = false;
  pending: boolean = false;
  moa: boolean = false;
  report: boolean = false;
  done: boolean = false;
  budget: boolean = false;
  
  params = [];
  isUser: true;
  state: number;
  stateLabel: string;
  isLinear = false;
  activeStep: number = 0;

  moa_file: File = null;
  signed: File = null;
  fileName: string;
  files: FileList;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ViewPorposalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ,private user: UserServices, private upload: UploadService) { 
  }

  showComment(): void {
    const dialogRef = this.dialog.open(CommentComponent, {
      width: '400px',
      panelClass: 'custom-dialog-comment'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  ngOnInit() {
    if (parseInt(this.data.data.proposal_status) < 0){
      this.pending = true;
    }
    if (parseInt(this.data.data.proposal_status) > 0){
      this.approved = true;
    }
    if (parseInt(this.data.data.proposal_status) > 1) {
      this.moa = true;
    }
    if (parseInt(this.data.data.proposal_status) > 2) {
      this.report = true;
    }
    if (parseInt(this.data.data.proposal_status) > 3) {
      this.approved = true;
    }
    if (parseInt(this.data.data.proposal_status) > 4) {
      this.done = true;
    }
    // this.activeStep += parseInt(this.data.data.proposal_status);


    if(this.data.data.budget_total > 0){
      this.budget = true;
    }
    this.stepper.selectedIndex = parseInt(this.data.data.proposal_status);

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
    if (this.state === 0) {
      this.stateLabel = 'For Revision';
    } else {
      this.stateLabel = 'Accepted';
    }
  }

  download_pdf(id,status){
    this.user.update_proj_stat({'id':id,'status':status}).subscribe(
      (response)=>{
        if (response){
          this.dialogRef.close();
          this.generatePDF();
        }
      }
    )
  }

  generatePDF(quality = 1) {
    const data = document.getElementById('contentToConvert');
    // $('#contentToConvert').css('overflow', 'visible');
    html2canvas(data, { scale: quality }).then(canvas => {
      // Few necessary setting options
      const contentDataURL = canvas.toDataURL('image/png');
      const imgWidth = 595;
      const pageHeight = 835;

      const ratio = pageHeight / imgWidth;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const newHeight = imgWidth * ratio;
      const heightLeft = imgHeight;
      const pdf = new jspdf('p', 'pt', 'a4');
      const position = 0;

      // document.body.appendChild(canvas);
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, pageHeight);

      // for (let i = 0; i <= data.clientHeight / 980; i++) {
      //   // ! This is all just html2canvas stuff
      //   const srcImg = canvas;
      //   const sX = 0;
      //   const sY = 980 * i; // start 980 pixels down for every new page
      //   const sWidth = 948;
      //   const sHeight = data.clientHeight;
      //   const dX = 0;
      //   const dY = 0;
      //   const dWidth = 948;
      //   const dHeight = data.clientHeight;

      //   // tslint:disable-next-line:prefer-const
      //   let onePageCanvas = document.createElement('canvas');
      //   onePageCanvas.setAttribute('width', '948');
      //   onePageCanvas.setAttribute('height', '980');
      //   const ctx = onePageCanvas.getContext('2d');
      //   // details on this usage of this function:
      //   // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
      //   ctx.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

      //   // document.body.appendChild(onePageCanvas);
      //   const canvasDataURL = onePageCanvas.toDataURL('image/png');

      //   const width = onePageCanvas.width;
      //   const height = onePageCanvas.clientHeight;

      //   // ! If we're on anything other than the first page,
      //   // add another page
      //   if (i > 0) {
      //     pdf.addPage('A4', 'l'); // 791, 612 8.5" x 11" in pts (in*72)
      //     // 842, 595, 8.27 × 11.69 inches A4 in pts (in*72)
      //   }
      //   // ! now we declare that we're working on that page
      //   pdf.setPage(i + 1);
      //   // !now we add content to that page! 20, 40
      //   pdf.addImage(canvasDataURL, 'PNG', 60, 10, (width * .62), (height * .62));
      //   console.log(data.clientHeight, data.clientWidth);
      // }
      // // ! after the for loop is finished running, we save the pdf.
      pdf.save('Proposal-Cover.pdf');
      this.dialog.closeAll();
      // $('#contentToConvert').css('overflow', 'auto');
    });
  }

  upload_moa(event) {
    
    // this.file = files.item(0);
    this.files = event.target.files;
    this.moa_file = this.files[0];
    this.fileName = this.files[0]['name'];
    $('#moaName').val(this.files[0]['name']);
  }

  upload_signed(event) {

    // this.file = files.item(0);
    this.files = event.target.files;
    this.signed = this.files[0];
    this.fileName = this.files[0]['name'];
    $('#signedName').val(this.files[0]['name']);
  }

  upload_files(title,id){
    this.upload.moa_c(this.moa_file,this.signed,title,id)
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
