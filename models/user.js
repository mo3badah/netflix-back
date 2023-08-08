const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new mongoose.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    role: { type: String, default: 'user', require: true },
    profilePicture: { type: String, required: false, default: '' },
    phone: { type: String, required: false, default: '' },
    visa: { type: String, required: false, default: '' }
});

userSchema.plugin(mongoosePaginate);

const User = mongoose.model('User', userSchema);

module.exports = User;