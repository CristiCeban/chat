import {Router} from "express"
import config from 'config'
import bcrypt from 'bcryptjs'
import {check, validationResult} from 'express-validator'
import axios from 'axios'
import Utils from '../utils/Utils'
import {Types} from "mongoose";

const User = require('../models/User')
const PushToken = require('../models/PushToken')
const auth = require('../middlewares/auth.middleware')

const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('first_name', 'First name is required').exists(),
        check('last_name', 'Last name is required').exists(),
        check('password', 'Password should be at least 6 char')
            .isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "registration data didn't pass validation"
                })
            }

            const {email, password, first_name, last_name} = req.body

            const candidate = await User.findOne({email})

            if (candidate)
                return res.status(400).json({
                    errors: [
                        {
                            msg: 'This user already exists',
                            param: 'email',
                            location: 'body',
                        }
                    ]
                })

            const hashedPassword = await Utils.createPassword(password)

            const user = new User({email, password: hashedPassword, first_name, last_name})

            await user.save()

            return res.status(201).json({msg: "Success", ppid: process.pid})
        } catch (e) {
            res.status(500).json({message: 'Server error'})
        }
    })

// /api/auth/login

router.post(
    '/login',
    [
        check('email', 'Enter valid mail').isEmail(),
        check('password', 'Password is empty').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "incorrect values for auth"
                })
            }

            const {email, password} = req.body;

            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "User with this email doesn't exists",
                            param: 'email',
                            location: 'body',
                        }
                    ]
                })
            }

            const isMatch = await Utils.checkPassword(password, user.password)

            if (!isMatch) {
                return res.status(400).json({
                    errors: [
                        {
                            msg: "Password is not matching,Please try again",
                            param: 'password',
                            location: 'body',
                        }
                    ]
                })
            }


            const newUserFound = await User.findOne({email}, {password: 0, "__v": 0})

            const token = Utils.createToken(newUserFound.id)

            return res.json({token, newUserFound})

        } catch (e) {
            res.status(500).json({message: 'Server error'})
        }
    }
)

//  /api/auth/expo
router.post(
    '/expo',
    [auth],
    async (req, res) => {
        try {
            const {user} = req
            const {expoToken} = req.body
            if (await PushToken.findOne({user: Types.ObjectId(user.userId)})) {
                await PushToken.findOneAndUpdate({user: Types.ObjectId(user.userId)}, {token: expoToken})
            } else {
                const pushToken = new PushToken({user: Types.ObjectId(user.userId), token: expoToken})
                await pushToken.save()
            }
            res.json({success: 'TOKEN SAVED'})
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'})
        }
    }
)

//  /api/auth/logout
router.get(
    '/logout',
    [auth],
    async (req, res) => {
        try {
            const {user} = req
            await PushToken.findOneAndUpdate({user: Types.ObjectId(user.userId)}, {token: ''})
            res.json({success: 'TOKEN SAVED'})
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'})
        }
    }
)

// /api/auth/facebook

router.post(
    '/facebook',
    async (req, res) => {
        try {
            const {token} = req.body;

            const fetchedUser = await axios.get(`https://graph.facebook.com/v10.0/me?transport=cors&access_token=${token}&fields=id,first_name,last_name,email,picture.type(large)`)
            console.log(fetchedUser.data)
            const {first_name, last_name, email, picture} = fetchedUser.data
            const user = await User.findOne({email}, {password: 0, "__v": 0})

            //create user
            if (!user) {
                //TODO add image download handler for user with image on facebook

                // await Utils.downloadImage(picture.data.url,'asa2.jpg')
                const hashedPassword = await bcrypt.hash(email, config.get('bcryptSalt'))
                const newUser = new User({email, first_name, last_name, password: hashedPassword})
                await newUser.save()
                const newUserFound = await User.findOne({email}, {password: 0, "__v": 0})
                const token = Utils.createToken(newUserFound.id)
                res.status(201).json({token, newUserFound})
            }
            //if user exist
            else {
                const token = Utils.createToken(user.id)
                res.json({token, user})
            }
        } catch (e) {
            res.status(500).json({message: 'Server error'})
        }
    }
)

router.post(
    '/google',
    async (req, res) => {
        try {
            const {token, user} = req.body;
            const {email, familyName, givenName, photoUrl} = user
            const isRegUser = await User.findOne({email}, {password: 0, "__v": 0})
            // if user is not registered already
            if (!isRegUser) {
                const hashedPassword = await bcrypt.hash(email, config.get('bcryptSalt'))
                const newUser = new User({
                    email,
                    first_name: givenName,
                    last_name: familyName,
                    password: hashedPassword
                })
                await newUser.save()
                const newUserFound = await User.findOne({email}, {password: 0, "__v": 0})
                const token = Utils.createToken(newUserFound.id)
                res.status(201).json({token, newUserFound})
            }
            // if user is already registered
            else {
                const token = Utils.createToken(isRegUser.id)
                res.json({token, isRegUser})
            }
        } catch (e) {
            res.status(500).json({message: 'Server error'})
        }
    }
)

module.exports = router
