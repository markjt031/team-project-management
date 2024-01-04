import { Component } from '@angular/core';
import { AnnouncementService } from '../announcement.service';
import { CompanyService } from '../company.service';
import { Announcement, Company } from '../models';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css'],
})
export class AnnouncementsComponent {
  announcements: Announcement[] = [];
  company: Partial<Company> = { id: -1, name: 'null' };
  showPostModal: boolean = false;

  constructor(
    private announcementService: AnnouncementService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.announcementService.currentAnnouncements.subscribe(
      (announcements) => (this.announcements = announcements)
    );
    this.companyService.currentCompany.subscribe(
      (company) => (this.company = company)
    );
    if (this.company.id && this.company.id > -1)
      this.announcementService.fetchAnnouncements(this.company.id);
    this.announcementService.fetchAnnouncements(1);
  }

  openPostModal = () => {
    this.showPostModal = true;
  };

  closePostModal = () => {
    this.showPostModal = false;
  };
}
