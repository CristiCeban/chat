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
        console.log(data)
        const {content, roomId, user} = data
        //new msg
        const message = new Message({content, room: Types.ObjectId(roomId), date: new Date(), author: user._id})
        await message.save()
        const room = await Room.findOne({_id: Types.ObjectId(roomId)})
        room.messages.push(message._id)
        await room.users.map(async (_user) => {
            //trigger notification with pusher
            if (_user._id.equals(Types.ObjectId(user._id)))
                return

            await pusher.trigger(`user.${_user._id}`, 'message', {
                content,
                author:user,
                roomId:roomId
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
        await room.save()

        // pusher.trigger(`user.${socket.handshake.query._id}`,'message',data)
    })
    console.log(`connection to ${process.pid}`);
    socket.emit('hello', {procces_pid: process.pid})
    socket.on("disconnect", () => {
        console.log('disconnected')
        console.log(socket.handshake.query._id)
    })
}
