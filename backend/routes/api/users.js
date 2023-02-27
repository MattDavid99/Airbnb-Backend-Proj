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
        .withMessage('Invalid email.'), // <<-- changed
    check('firstName') // <<-- changed
        .exists({ checkFalsy: true })
        // .isEmpty()
        .withMessage('First Name is required'),
    check('lastName') // <<-- changed
        .exists({ checkFalsy: true })
        // .isEmpty()
        .withMessage('Last Name is required'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username') // <<-- changed
        .exists({ checkFalsy: true })
        // .isEmpty()
        .withMessage('Username is required'),
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

            error.errors.map((ele) => {

                if (ele.path == "username") {
                    return res.status(403).json({
                        message: "User already exists",
                        statusCode: 403,
                        errors: {
                            username: `User with that username already exists`
                        }
                    })
                }

                if (ele.path == "email") {
                    return res.status(403).json({
                        message: "User already exists",
                        statusCode: 403,
                        errors: {
                            email: `User with that email already exists`
                        }
                    })
                }
            })

        }
    }
);




//_____________________________________________________________⬇️⬇️ This is the error obj we're working with
/*

{
    "name": "SequelizeUniqueConstraintError",
    "errors": [
        {
            "message": "email must be unique",
            "type": "unique violation",
            "path": "email",
            "value": "jn.smahahahahahaith@gmail.com",
            "origin": "DB",
            "instance": {
                "id": null,
                "username": "hahahahckDav",
                "email": "jn.smahahahahahaith@gmail.com",
                "hashedPassword": "$2a$10$fw.1k7DYdvc1J2nvR40XKuk.BfsyZC/awxXNZorcf3Dvqc4jGiK9O",
                "firstName": "hah",
                "lastName": "hahahaha",
                "updatedAt": "2023-02-15T22:44:50.677Z",
                "createdAt": "2023-02-15T22:44:50.677Z"
            },
            "validatorKey": "not_unique",
            "validatorName": null,
            "validatorArgs": []
        }
    ],
    "parent": {
        "errno": 19,
        "code": "SQLITE_CONSTRAINT",
        "sql": "INSERT INTO `Users` (`id`,`firstName`,`lastName`,`username`,`email`,`hashedPassword`,`createdAt`,`updatedAt`) VALUES (NULL,$1,$2,$3,$4,$5,$6,$7);"
    },
    "original": {
        "errno": 19,
        "code": "SQLITE_CONSTRAINT",
        "sql": "INSERT INTO `Users` (`id`,`firstName`,`lastName`,`username`,`email`,`hashedPassword`,`createdAt`,`updatedAt`) VALUES (NULL,$1,$2,$3,$4,$5,$6,$7);"
    },
    "fields": [
        "email"
    ],
    "sql": "INSERT INTO `Users` (`id`,`firstName`,`lastName`,`username`,`email`,`hashedPassword`,`createdAt`,`updatedAt`) VALUES (NULL,$1,$2,$3,$4,$5,$6,$7);"
}




*/




module.exports = router;
