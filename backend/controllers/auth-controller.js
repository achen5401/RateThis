const auth = require('../auth')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

getLoggedIn = async (req, res) => {
    try {
        let userId = auth.verifyUser(req);
        console.log(userId);
        if (!userId) {
            return res.status(200).json({
                loggedIn: false,
                user: null,
                errorMessage: "?"
            })
        }

        const loggedInUser = await User.findOne({ _id: userId });
        console.log("loggedInUser: " + loggedInUser);

        return res.status(200).json({
            loggedIn: true,
            user: {
                firstName: loggedInUser.firstName,
                email: loggedInUser.email
            }
        })
    } catch (err) {
        console.log("err: " + err);
        res.json(false);
    }
}

loginUser = async (req, res) => {
    console.log("loginUser");
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }

        const existingUser = await User.findOne({ email: email });
        console.log("existingUser: " + existingUser);
        if (!existingUser) {
            return res
                .status(401)
                .json({
                    errorMessage: "Wrong email or password provided."
                })
        }

        console.log("provided password: " + password);
        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordCorrect) {
            console.log("Incorrect password");
            return res
                .status(401)
                .json({
                    errorMessage: "Wrong email or password provided."
                })
        }

        // LOGIN THE USER
        const token = auth.signToken(existingUser._id);
        console.log(existingUser);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                firstName: existingUser.firstName,
                email: existingUser.email
            }
        })

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

googleSignIn = async (req, res) => {
    console.log("googleSignin");
    try {
        const { firstName, lastName, email } = req.body;

        const existingUser = await User.findOne({ email: email });
        console.log("existingUser: " + existingUser);
        if (existingUser) {
            const token = auth.signToken(existingUser._id);
            console.log(existingUser);

            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            }).status(200).json({
                success: true,
                user: {
                    firstName: existingUser.firstName,
                    email: existingUser.email
                }
            })
        }
        else {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const passwordHash = await bcrypt.hash("temp", salt);
            console.log("passwordHash: " + passwordHash);
            const newUser = new User({
                firstName, lastName, email, passwordHash
            });
            const savedUser = await newUser.save();
            console.log("new user saved: " + savedUser._id);
            // LOGIN THE USER
            const token = auth.signToken(savedUser._id);
            console.log("token:" + token);

            await res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            }).status(200).json({
                success: true,
                user: {
                    firstName: savedUser.firstName,
                    email: savedUser.email
                }
            })
        }

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

async function logoutUser(req, res) {
    auth.verify(req, res, async function () {
        try {
            return res
                .clearCookie("token")
                .cookie("token", "", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none"
                })
                .status(200)
                .json({
                    loggedIn: false,
                    user: null,
                })
                .send();
        } catch (err) {
            res.status(500).send();
        }
    });
}

registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        console.log("create user: " + email + " " + password);
        if (!firstName || !lastName || !email || !password) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        console.log("all fields provided");
        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        console.log("password long enough");
        const existingUser = await User.findOne({ email: email });
        console.log("existingUser: " + existingUser);
        if (existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }
        const existingEmail = await User.findOne({ email: email });
        console.log("existingEmail: " + existingEmail);
        if (existingEmail) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email already exists."
                })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        console.log("passwordHash: " + passwordHash);
        const newUser = new User({
            firstName, lastName, email, passwordHash
        });
        const savedUser = await newUser.save();
        console.log("new user saved: " + savedUser._id);
        // LOGIN THE USER
        const token = auth.signToken(savedUser._id);
        console.log("token:" + token);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                firstName: savedUser.firstName,
                email: savedUser.email
            }
        })

        console.log("token sent");

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

module.exports = {
    getLoggedIn,
    registerUser,
    loginUser,
    googleSignIn,
    logoutUser
}