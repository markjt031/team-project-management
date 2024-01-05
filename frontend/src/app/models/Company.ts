import {BasicUser} from "./BasicUser";
import {Team} from "./Team";

export interface Company{
    id: number,
    name: string,
    description: string,
    teams: Team[],
    users: BasicUser[]
  }