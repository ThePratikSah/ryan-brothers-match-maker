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
    age:{
        type: Number,
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
        type: Number
    },
    adhaar:{
        type: Number
    },
    address:{
        type: String
    },
    caste:{
        type: String
    },
    gender:{
        type: String,
    },
    membership:{
      type: String,
      default: 'NONE'
    },
    membershipExpiryDate:{
        type:Date
    },
    resetToken:{
        type: String
    },
    resetTokenExpiryDate:{
        type: Date
    },
    favourites:[{
        type:Schema.Types.ObjectID,
        ref: 'User'
    }]
},{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);