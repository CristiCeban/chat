import {Schema, model} from 'mongoose';

const schema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, unique: true},
    password: {type: String, required: true},
    imagePath: {type: String, required: false},
    isOnline: {type: Boolean},
    lastOnline: {type: Date},
    facebookId: {type: String}
})

module.exports = model('User', schema)
