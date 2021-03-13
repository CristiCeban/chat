import {Schema, model, Types} from 'mongoose';

const schema = new Schema({
    content: {type: 'String', required: true},
    date: {type: Date, required: true},
    author: {type: Types.ObjectId, required: true, ref: 'User'},
    room: {type: Types.ObjectId, required: true, ref: 'Room'},
})

module.exports = model('Message', schema)
