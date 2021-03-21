import {Router} from "express"
import {Types} from "mongoose";

const User = require('../models/User')
const Room = require('../models/Room')
const ConversationStatus = require('../models/ConversationStatus')
const auth = require('../middlewares/auth.middleware')

const router = Router()

// /api/chat/room/create
router.post(
    '/room/create',
    auth,
    async (req, res) => {
        try {
            const {user} = (req as any)
            const {users, name} = req.body
            const usersDB = [...users.map(user => Types.ObjectId(user)), Types.ObjectId(user.userId)]

            const roomToSearch = await Room.findOne({users: {$all: usersDB}})
            if (roomToSearch) {
                if (roomToSearch.isDeleted) {
                    await Room.findOneAndUpdate({"_id": roomToSearch.id}, {$set: {isDeleted: false}})
                    return res.json({message: 'Room is active now(undo delete)'})
                }
                return res.json({message: 'Room is active'})
            } else {
                const room = new Room({
                    author: Types.ObjectId(user.userId),
                    users: usersDB,
                    isDeleted: false,
                    name,
                })
                await room.save()
                await usersDB.map(async (user) => {
                    const conversation = new ConversationStatus({
                        room: room._id,
                        user,
                        isRead: true,
                        nrUnread: 0,
                    })
                    await conversation.save()
                })
                return res.status(201).json({message: 'Room created with success'})
            }
        } catch (e) {
            console.warn(e)
            res.status(500).json({message: 'Server error'})
        }
    }
)

// /api/chat/room/delete/id
router.get(
    '/room/delete/:id',
    async (req, res) => {

    })

// /api/chat/room/rooms
router.get(
    '/room/rooms',
    [auth],
    async (req, res) => {
        try {
            const {page = 1, limit = 10, search = ''} = req.query;
            const {user} = req
            const roomsAvailable = await Room.find({
                users: Types.ObjectId(user.userId),
                name: {$regex: search, $options: 'i'}
            }, {"__v": 0})
                .populate({
                    path: 'users',
                    select: '-password -__v'
                })
                .populate({
                    path: 'author',
                    select: '-password -__v'
                })
                .limit((limit * 1 as any))
                .skip((page - 1) * limit)
                .exec()

            const conversationsStatuses = await Promise.all(roomsAvailable.map(async (room) => {
                return await ConversationStatus.findOne({user: Types.ObjectId(user.userId), room: room._id});
            }))

            console.log(conversationsStatuses)
            const rooms = roomsAvailable.map((room: any, index) => {
                return {
                    _id: room._id,
                    messages: room.messages,
                    lastMessage: room.lastMessage,
                    users: room.users,
                    author: room.author,
                    isDeleted: room.isDeleted,
                    name: room.name,
                    isRead: (conversationsStatuses[index] as any)?.isRead,
                    nrUnread: (conversationsStatuses[index] as any)?.nrUnread,
                }
            })

            const count = await Room.countDocuments({
                users: Types.ObjectId(user.userId),
                name: {$regex: search, $options: 'i'}
            })
            res.json({
                rooms,
                totalPages: Math.ceil((count) / limit),
                currentPage: page
            })

        } catch (e) {
            res.status(500).json({message: 'Server error'})
        }

    })

// /api/chat/room/:id
router.get(
    '/room/:id',
    async (req, res) => {

    })

// /api/chat/message/:id
router.get(
    '/message/:id',
    async (req, res) => {

    })

// /api/chat/message/room/:id
router.get(
    '/message/room/:id',
    async (req, res) => {

    })


module.exports = router
