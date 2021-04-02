import {User} from "./user";
import {RoomType} from "./roomType";

export type MessageType = {
    _id: string,
    content: string,
    date: string,
    author: User,
    room?: RoomType,
}
