const express = require('express');
const { createBlog, updateBlog, deleteBlog, likeBlog, getAllBlog, getSingleBlog } = require('../controllers/blogController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authentication');
const { singleUpload } = require('../middleware/multer');
const router = express.Router();

router.route("/create").post(singleUpload,isAuthenticatedUser, authorizeRoles("admin"), createBlog);

router.route("/updateBlog/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateBlog);

router.route("/deleteBlog/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBlog);

router.route("/likeBlog/:id").put(isAuthenticatedUser, likeBlog);

router.route("/allBlog").get(getAllBlog);

router.route("/getSingleBlog/:id").get(getSingleBlog);

module.exports = router;