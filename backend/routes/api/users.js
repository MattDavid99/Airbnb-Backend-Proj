// backend/routes/api/users.js
const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

const router = express.Router();

// ----------------------------------------------------------------⬇️
// Sign up
// router.post('/', validateSignup, async (req, res) => {
//     const { email, password, username, firstName, lastName } = req.body;
//     const user = await User.signup({ email, username, password, firstName, lastName });

//     const token = await setTokenCookie(res, user);


//     return res.json({
//         id: user.id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         username: user.email,
//         token
//     });
// }
// );
router.post(
    '/',
    validateSignup,
    async (req, res) => {
        const { email, password, username, firstName, lastName } = req.body;

        try {
            const user = await User.signup({ email, username, password, firstName, lastName });
            const token = await setTokenCookie(res, user);

            return res.json({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                token
            });

        } catch (error) {
            // return res.json(error)
            const dynamicError = error.errors.map((ele) => {
                if (ele.path == "username") {
                    return res.json({
                        message: "User already exists",
                        statusCode: 403,
                        errors: {
                            username: `User with ${ele.value} already exists`
                        }
                    })
                }
            })

        }
    }
);









module.exports = router;