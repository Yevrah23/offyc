import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { SubmitProposalComponent } from '../submit-proposal/submit-proposal.component';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { UserServices } from 'src/app/services/user_services';

@Component({
  selector: 'app-report-template',
  templateUrl: './report-template.component.html',
  styleUrls: ['./report-template.component.scss']
})
export class ReportTemplateComponent implements OnInit {

  // for signatories
  sign: any;

  filename: string;
  titleReport: string;
  hemis: boolean;
  bar: boolean;
  prexc: boolean;

  dataPrexc: any;
  dataHemis: any [];
  dataBar: any [];

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SubmitProposalComponent>,
    private user: UserServices,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.sign = this.data.signQty;
   }

  ngOnInit() {
   if (this.data.radio === 'hemis') {
     this.hemis = true;
     this.titleReport = 'H.E.M.I.S';
     this.filename = 'Hemis';
   } else if (this.data.radio === 'bar') {
    this.bar = true;
    this.titleReport = 'B.A.R';
    this.filename = 'Bar';
   } else if (this.data.radio === 'prexc') {
    this.prexc = true;
    this.titleReport = 'P.R.E.X.C';
    this.filename = 'Prexc';
     this.user.get_prexc('1').subscribe(
       (response) => {
        // this.dataPrexc.forEach(element => {

        // });

         this.dataPrexc = response;
         console.log(this.dataPrexc);
       }
     );
   }
  }

  generatePDF(quality = 1) {
    const data = document.getElementById('contentToConvert');
    // $('#contentToConvert').css('overflow', 'visible');
    html2canvas(data, { scale: quality }).then(canvas => {
      // Few necessary setting options
      const contentDataURL = canvas.toDataURL('image/png');
      const imgWidth = 842;
      const pageHeight = 595;

      const ratio = pageHeight / imgWidth;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const newHeight = imgWidth * ratio;
      let heightLeft = imgHeight;
      const pdf = new jspdf('l', 'pt', 'a4');
      let position = 15;

      // document.body.appendChild(canvas);
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight + 10;
        pdf.addPage('a4', 'l');
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(`${this.filename}.pdf`);
      this.dialog.closeAll();
      console.log(imgHeight, canvas.height, canvas.width, heightLeft);
      // $('#contentToConvert').css('overflow', 'auto');
    });
  }

}
