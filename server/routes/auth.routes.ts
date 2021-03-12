import {Router} from "express"
import config from 'config'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {check, validationResult} from 'express-validator'

const User = require('../models/User')

const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('name', 'Name is required').exists(),
        check('surname', 'Surname is required').exists(),
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

            const {email, password, name, surname} = req.body

            const candidate = await User.findOne({email})

            if (candidate)
                return res.status(400).json({
                    errors: [
                        {
                            msg: 'This user already exist',
                            param: 'email',
                            location: 'body',
                        }
                    ]
                })


            const hashedPassword = await bcrypt.hash(password, config.get('bcryptSalt'))

            console.log(hashedPassword)

            const user = new User({email, password: hashedPassword, name, surname})

            await user.save()

            return res.status(201).json({msg: "Success", ppid: process.pid})
        } catch (e) {
            res.status(500).json({message: 'Server error'})
        }
    })

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
                return res.status(400).json({message: "User with this email didn't exist"})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: 'Invalid password,try again'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '24h'}
            )

            return res.json({token, user})

        } catch (e) {
            res.status(500).json({message: 'Server error'})
        }
    }
)

module.exports = router
