// backend/routes/api/session.js
const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();


const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Email or username is required'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Password is required'),
    handleValidationErrors
];


// ---------------------------------------------------------------------(POST: Log in) ✅✅✅ (errors)
router.post('/', validateLogin, async (req, res, next) => {


    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    // if (!user.credential || !user.password) {
    //     const err = new Error('Validation error')
    //     res.json(err.errors = {
    //         message: "Validation error",
    //         statusCode: 400,
    //         errors: {
    //             credential: "Email or username is required",
    //             password: "Password is required"
    //         }
    //     })
    //     return next(err)
    // }

    if (!user) {
        const err = new Error('Login failed');
        res.json(err.errors = {
            message: 'Invalid credentials',
            statusCode: 401
        })
        // err.title = 'Login failed';
        return next(err);
    }




    await setTokenCookie(res, user);

    const { id, firstName, lastName, email, username } = user
    return res.json({
        user: { id, firstName, lastName, email, username }
    });

}
);





// ------------------------------------------------------------------------(Log out)
router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);


// Restore session user
router.get(
    '/',
    restoreUser,
    (req, res) => {
        const { user } = req;

        if (user) {
            return res.json({
                user: user.toSafeObject()
            });
        } else return res.json({});
    }
);

// --------------------------------------------- 1. Get current user
// router.get('/', async (req, res, next) => {
//     const user = await User.findOne()
// })


// If you want to use literals in PostGres :
/*

 [Sequelize.literal((SELECT url FROM ${schema ? "${schema}"."SpotImages" : 'SpotImages'} WHERE "SpotImages"."spotId" = "Spot"."id" AND "SpotImages"."preview" = true LIMIT 1)),'previewImage',],


*/





module.exports = router;
