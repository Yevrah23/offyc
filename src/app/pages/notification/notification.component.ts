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
            if (element.notif_type_id === '1') {
              element.notif_type_id = 'sent an Extension Project Proposal';
            } else if (element.notif_type_id === '2') {
              element.notif_type_id = 'has approved your proposal for an Extension Project';
            } else if (element.notif_type_id === '3') {
              element.notif_type_id = 'denied your proposal for an Extension Project. You are requested to revise the proposal';
            } else if (element.notif_type_id === '4') {
              element.notif_type_id = 'sent a revision for an earlier Extension Project Proposal';
            } else if (element.notif_type_id === '5') {
              element.notif_type_id = 'sent an Accomplishment Report';
            }
          });
        }
        this.notifs = response[1];
      }
    );
  }

}
