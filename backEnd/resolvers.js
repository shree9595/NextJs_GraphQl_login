const User = require("./models/user");
const bcrypt = require('bcryptjs');
const { generateToken } = require('./utils/generate-token');

const AUTH_TOKEN_EXPIRY = '1y';

exports.resolvers = {
    Query: {
        hello: () => "hi",
        user: () => User.find(),
        getUser: async (root, { input: { email } }) => {
            const user = await User.findOne({ email })
            return user
        }
    },
    Mutation: {

        signup: async (root, { input: { name, email, password } }) => {
            const user = await User.findOne({ email })
            if (user) {
                throw new Error(`User with given email already exists.`);
            }
            // Empty field validation
            if (!name || !email || !password) {
                throw new Error('All fields are required.');
            }
            // Email validation
            const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!emailRegex.test(String(email).toLowerCase())) {
                throw new Error('Enter a valid email address.');
            }
            // Password validation
            if (password.length < 6) {
                throw new Error('Password min 6 characters.');
            }
            const newUser = await new User({
                name,
                email,
                password,
            }).save();

            return {
                token: generateToken(newUser, process.env.SECRET, AUTH_TOKEN_EXPIRY),
            };
        },
        signin: async (root, { input: { email, password } }) => {
            const user = await User.findOne({ email })

            if (!user) {
                throw new Error('User not found.');
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                throw new Error('Invalid password.');
            }

            const token = generateToken(user, process.env.SECRET, AUTH_TOKEN_EXPIRY)
            return {
                token

            }

        },

    }
};
