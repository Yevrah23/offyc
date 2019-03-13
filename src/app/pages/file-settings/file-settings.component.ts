import { Component, OnInit } from '@angular/core';
import { UserServices } from 'src/app/services/user_services';

@Component({
  selector: 'app-file-settings',
  templateUrl: './file-settings.component.html',
  styleUrls: ['./file-settings.component.scss']
})
export class FileSettingsComponent implements OnInit {
  pdf: boolean = false;
  word: boolean = false;
  file_size: number = 0;

  constructor(private user: UserServices) { }

  ngOnInit() {
    this.get_settings();
  }

  get_settings(){
    this.user.get_settings().subscribe(
      (response: any []) => {
        response.forEach(element => {
          if(element.setting_description == "filetype"){
            if (element.setting_value == "application/pdf"){
              this.pdf = true;
            }else if (element.setting_value == "application/msword") {
              this.word = true;
            }
          } else if(element.setting_description == "filesize"){
            this.file_size = parseInt(element.setting_value);
          }

        });
      }
    )
  }


  save(){
    console.log(this.pdf);
    console.log(this.word);
    console.log(this.file_size);
  }

}
