import { BasicUser } from './BasicUser';

export interface Announcement {
  id: number;
  // The date can be a string because it is received from the backend as java.sql.Timestamp string.
  // Convert it to a Date object in the frontend by using new Date(timestamp).
  date: Date | string;
  title: string;
  message: string;
  author: BasicUser;
}
