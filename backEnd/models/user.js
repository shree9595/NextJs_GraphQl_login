const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

/**
 * User schema that has references to Post, Like, Comment, Follow and Notification schemas
 */
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        }


    },
    {
        timestamps: true,
    }
);

/**
 * Hashes the users password when saving it to DB
 */
userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);

            this.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', userSchema);
