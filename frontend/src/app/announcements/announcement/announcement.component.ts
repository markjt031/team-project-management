import { Component, Input } from '@angular/core';
import { Announcement } from 'src/app/models';

// export interface Announcement {
//   id: number;
//   // The date can be a string because it is received from the backend as java.sql.Timestamp string.
//   // Convert it to a Date object in the frontend by using new Date(timestamp).
//   date: Date | string;
//   title: string;
//   message: string;
//   author: BasicUser;
// }

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css'],
})
export class AnnouncementComponent {
  @Input() announcement: Announcement | undefined = undefined;
}
