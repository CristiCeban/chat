import {User} from "./user";
import {MessageType} from "./Message";

export type RoomType = {
    _id: string,
    lastMessage?: MessageType,
    users: Array<User>
    author: User,
    isDeleted: boolean,
    name: string,
    isRead: boolean,
    nrUnread: number,
}
