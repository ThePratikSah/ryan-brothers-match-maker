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

exports.getUser = async (req, res, next) => {
    const userId = req.params.userId;
};