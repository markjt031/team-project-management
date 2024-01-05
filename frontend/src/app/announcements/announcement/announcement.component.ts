import { Component, Input } from '@angular/core';
import { Announcement } from 'src/app/models';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css'],
})
export class AnnouncementComponent {
  @Input() announcement: Announcement | undefined = undefined;
}
