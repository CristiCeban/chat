import {Schema, model, Types} from 'mongoose';

const schema = new Schema({
    messages: [{type: Types.ObjectId, ref: 'Message'}],
    lastMessage: {type: Types.ObjectId, ref: 'Message'},
    users: [{type: Types.ObjectId, ref: 'User', required: true}],
    author: {type: Types.ObjectId, ref: 'User', required: true},
    isDeleted: {type: Boolean, required: true},
    name: {type: String, required: true},
    lastUpdated: {type: Date}
})

module.exports = model('Room', schema)
