const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    resetToken:{
        type: String
    },
    resetTokenExpiryDate:{
        type: Date
    },
    favourites:{
        type:Schema.Types.ObjectID,
        ref: 'User'
    }
});

module.exports = mongoose.model('User', userSchema);