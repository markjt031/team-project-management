import {Company} from "./Company";
import {Profile} from "./Profile";
import {Team} from "./Team";

//model to match basic user DTO
export interface FullUser{
    id?: number,
    profile: Profile,
    isAdmin: boolean,
    active: boolean,
    status: boolean,
    companies: Company[],
    teams: Team[]
}