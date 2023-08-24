const Blog = require("../models/blogModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");
const { getDataUri } = require("../utils/dataUri");

// *+=*+=*/+*+*=+*=/+ Create Blog(Admin) *+=*+=*/+*+*=+*=/+ 
exports.createBlog = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;

    const { title, description, category } = req.body;

    const file = req.file;

    const fileUri = getDataUri(file);

    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

    const blog = await Blog.create({
        title, description, category,
        photo: {
            public_id: myCloud.public_id,
            secure_url: myCloud.secure_url,
        },
    });

    res.status(200).json({
        success: true,
        blog
    });
});

// *+=*+=*/+*+*=+*=/+ Update Blog (Admin)*+=*+=*/+*+*=+*=/+ 
exports.updateBlog = catchAsyncErrors(async (req, res, next) => {
    const newBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        newBlog
    });
});

// *+=*+=*/+*+*=+*=/+ Delete Blog *+=*+=*/+*+*=+*=/+ 
exports.deleteBlog = catchAsyncErrors(async (req, res, next) => {

    const newBlog = await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Blog delete successfully"
    });
});

// *+=*+=*/+*+*=+*=/+ Like Blog *+=*+=*/+*+*=+*=/+ 
exports.likeBlog = catchAsyncErrors(async (req, res, next) => {

    const blog = await Blog.findById(req.params.id);

    if (blog.likes.includes(req.user.id)) {
        blog.likes = blog.likes.filter((user) => user !== req.user.id);
        await blog.save();

        return res.status(200).json({ message: "Unlike the blog successfully" });
    }
    else {
        blog.likes.push(req.user.id)
        await blog.save();

        return res.status(200).json({ message: "like the blog successfully" });
    }
});

// *+=*+=*/+*+*=+*=/+ Get All Blog *+=*+=*/+*+*=+*=/+ 
exports.getAllBlog = catchAsyncErrors(async (req, res, next) => {

    const blog = await Blog.find();

    res.status(200).json({
        success: true,
        blog
    })

});

// *+=*+=*/+*+*=+*=/+ Get Single Blog *+=*+=*/+*+*=+*=/+ 
exports.getSingleBlog = catchAsyncErrors(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);

    res.status(200).json({
        // success: true,
        blog
    })
});

// *+=*+=*/+*+*=+*=/+ Top 5 Blogs *+=*+=*/+*+*=+*=/+ 
exports.getTop5Blogs = catchAsyncErrors(async (req, res, next) => {

});

// *+=*+=*/+*+*=+*=/+ Update Blog Status Blog(Admin) *+=*+=*/+*+*=+*=/+ 
exports.updateBlogStatus = catchAsyncErrors(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id)
    if (blog.statusCode == 0) {
        const newStatusCode = {
            statusCode: 1
        };

        const blog = await Blog.findByIdAndUpdate(req.params.id, newStatusCode, {
            new: true,
            runValidators: true,
            useFindAndModify: true,
        })
        res.status(200).json({
            success: true,
            message: 'User statusCode 1'
        })
    } else {
        const newStatusCode = {
            statusCode: 0
        };

        const blog = await Blog.findByIdAndUpdate(req.params.id, newStatusCode, {
            new: true,
            runValidators: true,
            useFindAndModify: true,
        })
        res.status(200).json({
            success: true,
            message: 'User statusCode 0'
        })
    }

});