import {Schema, model, Types} from 'mongoose';

const schema = new Schema({
    room: {type: Types.ObjectId, required: true, ref: 'Room'},
    user: {type: Types.ObjectId, required: true, ref: 'User'},
    isRead: {type: Boolean, required: true},
    nrUnread: {type: Number, required: true}
})

module.exports = model('ConversationStatus',schema)
