const User = require('../models/user');

exports.getAllUsers = async(req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 10;
    try{
        const users = await User.find({}, 'name profileImageUrl age gender').skip((currentPage - 1) * perPage).limit(perPage);
        res.status(200).json({
            message: 'Users fetched successfully',
            data: {
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

exports.updateProfile = async (req, res, next) => {
    const userId = req.params.userId;
    const name = req.body.name;
    const  email = req.body.email;
    const age = req.body.age;
    const address = req.body.address;
    const caste = req.body.caste;
    const gender = req.body.gender;
    let profileImageUrl = req.body.image;
    if (req.file) {
        profileImageUrl = req.file.path;
    }
    if (!profileImageUrl) {
        const error = new Error('No file picked.');
        error.statusCode = 422;
        throw error;
    }
    try{
        const user = await User.findById(userId);
        if (!user){
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
        user.profileImageUrl = profileImageUrl;
        const result = await user.save();
        res.status(201).json({
            message: 'User updated successfully',
            result: result
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
};

exports.verifyMobile = (req, res, next) => {

};

exports.upgradeMembership = (req, res, next) => {

};

//helper function to delete image
const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
};