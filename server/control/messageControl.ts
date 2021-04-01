import {Socket} from "socket.io";

const ConversationStatus = require('../models/ConversationStatus')
const Room = require('../models/Room')
const Message = require('../models/Message')
const Pusher = require("pusher");
import {Types} from 'mongoose'

export const MessageControl = (socket: Socket) => {
    const pusher = new Pusher({
        appId: "1170414",
        key: "e7b49de1db93e5713dc5",
        secret: "7ad6f85ba2dbad914694",
        cluster: "eu",
        useTLS: true
    });
    console.log('connected')
    console.log(socket.handshake.query._id)
    socket.on("message", async (data) => {
        console.log(data)
        const {content, roomId, user} = data
        const message = new Message({content, room: Types.ObjectId(roomId), date: new Date(), author: user._id})
        await message.save()
        const room = await Room.findOne({_id: Types.ObjectId(roomId)})
        room.messages.push(message._id)
        // room.users.map(_user => {
        //     const conversation = ConversationStatus.findOne({
        //         user:
        //     })
        // })
        await room.save()
        // await Room.update(
        //     {_id: Types.ObjectId(roomId)},
        //     {$push: {messages: message._id}}
        // )

        // pusher.trigger(`user.${socket.handshake.query._id}`,'message',data)
    })
    console.log(`connection to ${process.pid}`);
    socket.emit('hello', {procces_pid: process.pid})
    socket.on("disconnect", () => {
        console.log('disconnected')
        console.log(socket.handshake.query._id)
    })
}
