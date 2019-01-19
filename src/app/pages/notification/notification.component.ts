import { Component, OnInit } from '@angular/core';
import { UserServices } from 'src/app/services/user_services';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifs = [];
  constructor(private user: UserServices, private cookies:CookieService) { }

  ngOnInit() {
    this.user.getNotifs(this.cookies.get('id')).subscribe(
      (response) => {
        console.log(response);
        if (response[0]) {
          response[1].forEach(element => {
            if (element.notif_type_id == 1){
                element.notif_type_id = "sent an Extension Project Proposal";
            } else if (element.notif_type_id == 2) {
              element.notif_type_id = "You're proposal for an Extension Project has been approved";
            } else if (element.notif_type_id == 3) {
                element.notif_type_id = "You're proposal for an Extension Project has been denied"
            } else if (element.notif_type_id == 4) {
              element.notif_type_id = "sent an Accomplishment Report"
            }       
          });
        }
        this.notifs = response[1];
      }
    );
  }

}
