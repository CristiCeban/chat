import {Router} from "express"
import config from 'config'
import {Types} from "mongoose";

const User = require('../models/User')
const Room = require('../models/Room')
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
    async (req, res) => {

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
