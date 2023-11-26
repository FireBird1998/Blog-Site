const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema({
    username: {type: String, required: true, min: 4, unique: true},
    password: {type: String, required: true, min: 6},
})

const UserModel = model('User', userSchema);

module.exports = UserModel;