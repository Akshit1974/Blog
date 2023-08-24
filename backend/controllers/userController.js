const User = require('../models/userModel');
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const { getDataUri } = require('../utils/dataUri');
const cloudinary = require("cloudinary");


// *+=*+=*/+*+*=+*=/+ Register User *+=*+=*/+*+*=+*=/+ 
exports.register = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name, email, password,
    });

    sendToken(user, 200, res);
});

// *+=*+=*/+*+*=+*=/+ Login User *+=*+=*/+*+*=+*=/+
exports.userLogin = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter E-mail or password ", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid E-mail or Password", 401));
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid E-mail or Password", 401));
    }

    sendToken(user, 200, res);
});

// *+=*+=*/+*+*=+*=/+ Logout User *+=*+=*/+*+*=+*=/+ 
exports.logout = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: "Logout Successfully"
    });

});

// *+=*+=*/+*+*=+*=/+ Get User Details *+=*+=*/+*+*=+*=/+ 
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    });
});

// *+=*+=*/+*+*=+*=/+ Update User Role(Admin) *+=*+=*/+*+*=+*=/+
exports.updateRole = catchAsyncErrors(async (req, res, next) => {
    const newRole = {
        role: "admin "
    };

    const user = await User.findByIdAndUpdate(req.params.id, newRole, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    });

    res.status(200).json({
        success: true,
        message: 'User role changed'
    })
});

// *+=*+=*/+*+*=+*=/+ Get All User (Admin) *+=*+=*/+*+*=+*=/+ 
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    });
});

// *+=*+=*/+*+*=+*=/+ Get Single User Details (Admin) *+=*+=*/+*+*=+*=/+ 
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User not exist ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        user
    })
});

// *+=*+=*/+*+*=+*=/+ Get Single User Details (Admin) *+=*+=*/+*+*=+*=/+ 
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully"
    })
})