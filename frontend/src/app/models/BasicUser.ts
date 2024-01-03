import { Profile } from './Profile';

export interface BasicUser {
  id: number;
  profile: Profile;
  admin: boolean;
  active: boolean;
  status: string;
}
