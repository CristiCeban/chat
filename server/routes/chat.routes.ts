import {Router} from "express"
import config from 'config'

const router = Router()

// /api/chat/room/create
router.post(
    '/room/create',
    async (req, res) => {

    })

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
