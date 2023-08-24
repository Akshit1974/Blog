const express = require("express");
const { register, userLogin, logout, getUserDetails, updateRole, getAllUser } = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/authentication");
const { singleUpload } = require("../middleware/multer");

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(userLogin);

router.route("/logout").post(logout);

router.route("/me").get(isAuthenticatedUser,getUserDetails);



module.exports =   router;