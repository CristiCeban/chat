import bcrypt from "bcryptjs";
const Fs = require('fs')
const Path = require('path')
const axios = require('axios')
import jwt from 'jsonwebtoken'
import config from 'config'



const Utils = {
    downloadImage : async (url:string,imageName:string) => {
        const path = Path.resolve(__dirname,'../images',imageName)
        const writer = Fs.createWriteStream(path)
        try {
            const response = await axios({
                url,
                method: 'GET',
                responseType: 'stream'
            })

            response.data.pipe(writer)

            return new Promise((resolve, reject) => {
                writer.on('finish', resolve)
                writer.on('error', reject)
            })
        }
        catch (e) {
            console.warn(e)
        }
    },
    createToken : (id:string) =>{
        return jwt.sign(
            {userId: id},
            config.get('jwtSecret'),
            {expiresIn: '24h'}
        )
    },
    createPassword: async (password:string) =>{
        return bcrypt.hash(password, config.get('bcryptSalt'))
    },
    checkPassword: async (password:string,bdPassword:string) => {
        return bcrypt.compare(password, bdPassword)
    }
}

export default Utils
