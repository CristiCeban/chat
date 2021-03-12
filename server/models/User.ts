import {Schema, model, Types} from 'mongoose';

const schema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    imagePath: {type: String, required: false},
})

module.exports = model('User', schema)
