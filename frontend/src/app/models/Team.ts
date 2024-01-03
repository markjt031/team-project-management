import { BasicUser } from './BasicUser';

export interface Team {
  id: number;
  name: string;
  description: string;
  teammates: BasicUser[];
}
