import {Router} from "express"
import {Types} from "mongoose";
// import path from "path";

const User = require('../models/User')
const auth = require('../middlewares/auth.middleware')
// const parseFormData = require('../middlewares/parseFormData.middleware')
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'images/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
//     }
// });
// const upload = multer({storage: storage,limits:{fileSize: 10 * 1024 * 1024}})
// const upload = multer({dest : 'images/'})
const router = Router()


router.get(
    '/me',
    auth,
    async (req, res) => {
        try {
            const {user} = (req as any)
            const currentUser = await User.findOne({"_id": Types.ObjectId(user.userId)}, {password: 0, "__v": 0})

            res.json({user: currentUser})
        } catch (e) {
            res.status(500).json({message: 'Server error'})
        }
    })

router.post(
    '/edit',
    auth,
    async (req, res) => {
        try {
            const {first_name, last_name, imagePath} = req.body
            const {user} = (req as any)
            const currentUser = await User.findOne({"_id": Types.ObjectId(user.userId)}, {password: 0, "__v": 0})

            if (imagePath) {
                const currentUser = await User.findOneAndUpdate({"_id": Types.ObjectId(user.userId)}, {
                    $set: {
                        first_name,
                        last_name,
                        imagePath
                    },
                }, {new: true,password:0,_v:0})
                return res.json({user: currentUser})
            } else {
                const currentUser = await User.findOneAndUpdate({"_id": Types.ObjectId(user.userId)}, {
                    $set: {
                        first_name,
                        last_name,
                    },
                }, {new: true,password:0,_v:0})
                return res.json({user: currentUser})
            }
        } catch (e) {
            res.status(500).json({message: 'Server error'})
        }
    }
)

module.exports = router
