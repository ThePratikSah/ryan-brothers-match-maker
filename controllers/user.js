const User = require('../models/user');

exports.getAllUsers = async (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 10;
    try {
        const users = await User.find({}, 'name profileImageUrl age gender').skip((currentPage - 1) * perPage).limit(perPage);
        res.status(200).json({
            message: 'Users fetched successfully',
            data: {
                users: users
            }
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getAllUsersAfterLogin = async (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 10;
    try {
        const users = await User.find({_id: {$ne: req.userId}}, 'name profileImageUrl age gender email adhaar address caste mobile')
            .skip((currentPage - 1) * perPage).limit(perPage);
        res.status(200).json({
            message: 'Users fetched successfully',
            data: {
                users: users
            }
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateProfile = async (req, res, next) => {
    const userId = req.userId;
    const name = req.body.name;
    const email = req.body.email;
    const age = req.body.age;
    const address = req.body.address;
    const caste = req.body.caste;
    const gender = req.body.gender;
    // const mobile = req.body.mobile;
    let profileImageUrl = req.body.image;
    if (req.file) {
        profileImageUrl = req.file.path;
    }
    if (!profileImageUrl) {
        const error = new Error('No file picked.');
        error.statusCode = 422;
        throw error;
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        user.name = name;
        user.email = email;
        user.age = age;
        user.address = address;
        user.caste = caste;
        user.gender = gender;
        // user.mobile = mobile;
        user.profileImageUrl = profileImageUrl;
        const result = await user.save();
        res.status(201).json({
            message: 'User updated successfully',
            result: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getUser = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'User fetched successfully',
            user: user
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.changeAdhaar = async (req, res, next) => {
    const userId = req.userId;
    const adhaar = req.body.adhaar;
    try {
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        user.adhaar = adhaar;
        user.isVerified = false;
        const result = await user.save();
        res.status(201).json({
            message: 'Adhaar updated. Verification pending',
            result: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

//TODO: Send SMS to verify
exports.changeMobile = async (req, res, next) => {
    const userId = req.userId;
    const mobile = req.body.mobile;
    try {
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        user.mobile = mobile;
        user.isMobileVerified = false;
        const result = await user.save();
        res.status(201).json({
            message: 'Mobile number changed succesfully, verification pending',
            result: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.verifyMobile = async (req, res, next) => {
    const userId = req.params.userId;
    const mobileOtp = req.body.mobileOtp;
    try {
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        if (user.mobileOtp !== mobileOtp) {
            const error = new Error('OTP verification error');
            error.statusCode = 403;
            throw error;
        }
        user.mobileOtp = mobileOtp;
        user.isMobileVerified = true;
        const result = user.save();
        res.status(201).json({
            message: 'Mobile number verified successfully',
            result: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.markUserFavourite = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const favUser = await User.findById(userId);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        const user = await User.find(req.userId);
        user.favourites.push(favUser);
        await user.save();
        res.status(200).json({
            message: 'User as Favourite',
            favUserId: favUser._id
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.removeFavourite = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const favUser = await User.findById(userId);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        const user = await User.find(req.userId);
        user.favourites.pull(favUser);
        await user.save();
        res.status(200).json({
            message: 'Removed from Favourite',
            favUserId: favUser._id
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

//TODO: Apply payment gateway here for membership
exports.upgradeMembership = async (req, res, next) => {
    const userId = req.userId;
    const appliedMembership = req.body.appliedMembership;
    try {
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        if (appliedMembership === 'BRONZE') {
            user.membership = appliedMembership;
            const date = new Date();
            date.setMonth(date.getMonth() + 1);
            user.membershipExpiryDate = date;
        }
        if (appliedMembership === 'SILVER') {
            user.membership = appliedMembership;
            const date = new Date();
            date.setMonth(date.getMonth() + 3);
            user.membershipExpiryDate = date;
        }
        if (appliedMembership === 'GOLD') {
            user.membership = appliedMembership;
            const date = new Date();
            date.setMonth(date.getMonth() + 6);
            user.membershipExpiryDate = date;
        }
        if (appliedMembership === 'PLATINUM') {
            user.membership = appliedMembership;
            const date = new Date();
            date.setMonth(date.getMonth() + 12);
            user.membershipExpiryDate = date;
        }
        const result = await user.save();
        res.status(200).json({
            message: `Membership upgraded to ${appliedMembership}`,
            result: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

//helper function to delete image
const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
};