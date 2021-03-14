import {Schema, model, Types} from 'mongoose';

const schema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    imagePath: {type: String, required: false},
    isOnline:{type:Boolean},
    lastOnline:{type:Date}
})

module.exports = model('User', schema)
