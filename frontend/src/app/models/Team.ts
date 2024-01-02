import BasicUser from "./BasicUser";

//matches the team dto
export default interface Team{
    id?: number,
    name: string,
    description: string,
    teammates: BasicUser[]
}