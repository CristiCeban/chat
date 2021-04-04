import {Socket} from "socket.io";

const ConversationStatus = require('../models/ConversationStatus')
const Room = require('../models/Room')
const Message = require('../models/Message')
const Pusher = require("pusher");
import {Types} from 'mongoose'

const pusher = new Pusher({
    appId: "1170414",
    key: "e7b49de1db93e5713dc5",
    secret: "7ad6f85ba2dbad914694",
    cluster: "eu",
    useTLS: true
});

export const MessageControl = (socket: Socket) => {

    console.log('connected')
    console.log(socket.handshake.query._id)
    socket.on("message", async (data) => {
        const {content, room, author, date} = data
        //new msg
        const message = new Message({
            content,
            room: Types.ObjectId(room._id),
            date: new Date(),
            author: Types.ObjectId(author._id)
        })
        await message.save()
        const roomSelected = await Room.findOne({_id: Types.ObjectId(room._id)})
        roomSelected.messages.push(message._id)
        roomSelected.lastUpdated = new Date()
        await roomSelected.users.map(async (_user) => {
            if (_user._id.equals(Types.ObjectId(author._id)))
                return

            //trigger notification with pusher
            await pusher.trigger(`user.${_user._id}`, 'message', {
                content,
                author,
                room,
                date,
                _id: message._id,
            })

            //update conversation statuses related to this room+user
            await ConversationStatus.findOneAndUpdate({
                user: _user._id,
                room: room._id,
            }, {
                isRead: false,
                $inc: {nrUnread: 1}
            })
        })
        await roomSelected.save()
    })
    console.log(`connection to ${process.pid}`);
    socket.emit('hello', {procces_pid: process.pid})
    socket.on("disconnect", () => {
        console.log('disconnected')
        console.log(socket.handshake.query._id)
    })
}
