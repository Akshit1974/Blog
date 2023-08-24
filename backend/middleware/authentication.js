const catchAsyncErrors = require('./catchAsyncErrors');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const ErrorHandler = require('../utils/errorhandler');

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource", 401));
    };

    const decodedData = jwt.verify(token, "Blogs");

    req.user = await User.findById(decodedData.id);
    next();
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
           return next( new ErrorHandler(`Role ${req.user.role} is not allowed the resource`,403));
        }   ;
        next();
    };
};