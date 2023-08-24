const express = require("express");
const {updateRole, getAllUser, getSingleUser, deleteUser } = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/authentication");
const { updateBlogStatus } = require("../controllers/blogController");
const router = express.Router();

router.route("/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

router.route("/user/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateRole)
        .get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser)
        .delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser);


router.route("/updateBlogStatus/:id").post(isAuthenticatedUser,authorizeRoles("admin"),updateBlogStatus)

module.exports =   router;