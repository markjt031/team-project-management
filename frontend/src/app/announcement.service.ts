import { Injectable } from '@angular/core';
import { Announcement, User } from './models';
import { BehaviorSubject } from 'rxjs';
import { fetchData } from './services/api';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  private announcements = new BehaviorSubject<Announcement[]>([]);
  currentAnnouncements = this.announcements.asObservable();

  updateAnnouncements = (announcements: Announcement[]) => {
    this.announcements.next(announcements);
  };

  fetchAnnouncements = async (companyId: number) => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const announcements: Announcement[] = await fetchData(
        `company/${companyId}/announcements`,
        options
      );
      this.updateAnnouncements(announcements);
    } catch (error) {
      console.error(error);
    }
  };

  // postAnnouncement = async (
  //   user: User,
  //   announcement: Announcement,
  //   companyId: number
  // ) => {
  //   try {
  //     const options = {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ announcement }),
  //     };

  //     await fetchData(`company/${companyId}/announcements`, options);
  //     this.fetchAnnouncements(companyId);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
}
