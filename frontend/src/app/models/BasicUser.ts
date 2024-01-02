import Profile from "./Profile";

//model to match basic user DTO
export default interface BasicUser{
    id?: number,
    profile: Profile,
    admin: boolean,
    active: boolean,
    status: boolean
}
