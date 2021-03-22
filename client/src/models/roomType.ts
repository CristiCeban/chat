import {User} from "./user";

export type RoomType = {
    _id: string,
    messages: Array<string>,
    users: Array<User>
    author: User,
    isDeleted: boolean,
    name: string,
    isRead: boolean,
    nrUnread: number,
}
