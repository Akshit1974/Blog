const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
    },
    email: {
        type: String
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: "admin"
    }

}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    };
    this.password = await bcrypt.hash(this.password, 10);
});

// *+=*+=*/+*+*=+*=/+ Jsonwebtoken Token *+=*+=*/+*+*=+*=/+
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, "Blogs", {
        expiresIn: "1d"
    });
};

// *+=*+=*/+*+*=+*=/+ Compare Password *+=*+=*/+*+*=+*=/+
userSchema.methods.comparePassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
};


module.exports = mongoose.model("User", userSchema);
