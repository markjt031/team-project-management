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
      this.updateAnnouncements(
        announcements.sort((a, b) =>
          new Date(a.date) > new Date(b.date) ? -1 : 1
      )
      );
    } catch (error) {
      console.error(error);
    }
  };

  postAnnouncement = async (
    authorId: number,
    title: string,
    message: string,
    companyId: number
  ) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ authorId, title, message, companyId }),
      };

      await fetchData(`announcements`, options);
      this.fetchAnnouncements(companyId);
    } catch (error) {
      console.error(error);
    }
  };
}
