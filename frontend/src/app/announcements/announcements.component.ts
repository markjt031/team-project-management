import { Component } from '@angular/core';
import { AnnouncementService } from '../announcement.service';
import { CompanyService } from '../company.service';
import { Announcement, Company } from '../models';
import { UserService } from '../user.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css'],
})
export class AnnouncementsComponent {
  announcements: Announcement[] = [];
  company: Partial<Company> = { id: -1, name: 'null' };
  showPostModal: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private announcementService: AnnouncementService,
    private companyService: CompanyService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.announcementService.currentAnnouncements.subscribe(
      (announcements) => (this.announcements = announcements)
    );
    this.companyService.currentCompany.subscribe(
      (company) => (this.company = company)
    );
    this.userService.currentUser.subscribe((user) => {
      this.isAdmin = user.admin;
    });
    if (this.company.id && this.company.id > -1)
      this.announcementService.fetchAnnouncements(this.company.id);
  }

  fetchAnnouncements = () => {
    if (this.company.id)
      this.announcementService.fetchAnnouncements(this.company.id);
  };

  openPostModal = () => {
    this.showPostModal = true;
  };

  closePostModal = () => {
    this.showPostModal = false;
  };
}
