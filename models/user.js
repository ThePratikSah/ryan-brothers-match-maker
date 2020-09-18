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
    profileImageUrl:{
        type: String,
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isAuthorized:{
        type: Boolean,
        default: false
    },
    isProfileComplete:{
        type: Boolean,
        default: false
    },
    mobile:{
        type: Number,
        required: true
    },
    adhaar:{
        type: Number,
        required: true
    },
    address:{
        type: String
    },
    caste:{
        type: String
    },
    gender:{
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
},{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);