import BasicUser from "./BasicUser";
import Team from "./Team";

export default interface Company{
    id?: number,
    name: string,
    description: string,
    teams: Team[],
    users: BasicUser[]
  }