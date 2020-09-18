const fs = require('fs');

const User = require('../models/user');

exports.getAllUsers = async(req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 2;
    try{
        const totalUsers = await User.find().countDocuments();
        const users = await User.find().skip((currentPage - 1) * perPage).limit(perPage);
        res.status(200).json({
            message: 'Users fetched successfully',
            data: {
                totalUsers: totalUsers,
                users: users
            }
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getUser = async (req, res, next) => {
    const userId = req.params.userId;
    try{
        const user = await User.findById(userId);
        if (!user){
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }
        res.status(200).json({
            message: 'User fetched successfully',
            user: user
        });
    }catch (err){
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.toggleVerifyUser = async (req, res, next) => {
    const userId = req.params.userId;
    try{
        const user = await User.findById(userId);
        if (!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        user.isVerified = !user.isVerified;
        await user.save();
        res.status(201).json({
            message: `User verification status set to ${user.isVerified}`,
            user: user
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.toggleIsAuthorized =async (req, res, next) => {
    const userId = req.params.userId;
    try{
        const user = await User.findById(userId);
        if (!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        user.isAuthorized = !user.isAuthorized;
        await user.save();
        res.status(201).json({
            message: `User auth status set to ${user.isAuthorized}`,
            user: user
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.toggleIsProfileComplete = async(req, res, next) => {
    const userId = req.params.userId;
    try{
        const user = await User.findById(userId);
        if (!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        user.isProfileComplete = !user.isProfileComplete;
        await user.save();
        res.status(201).json({
            message: `User profile completion status set to ${user.isProfileComplete}`,
            user: user
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};