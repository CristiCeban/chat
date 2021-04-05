import {Schema, model, Types} from 'mongoose';

const schema = new Schema({
    user: {type: Types.ObjectId, ref: 'User', required: true},
    token: {type: String,}
})

module.exports = model('PushToken',schema)
