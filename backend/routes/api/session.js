// backend/routes/api/session.js
const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
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


    if (!user) {
        const err = new Error('Login failed');
        res.status(401).json(err.errors = {
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
    requireAuth, restoreUser,
    (req, res) => {
        const { user } = req;

        if (user) {
            return res.json({
                user: user.toSafeObject()
            });
        } else return res.json({});
    }
);


// If you want to use literals in PostGres :
/*

 [Sequelize.literal((SELECT url FROM ${schema ? "${schema}"."SpotImages" : 'SpotImages'} WHERE "SpotImages"."spotId" = "Spot"."id" AND "SpotImages"."preview" = true LIMIT 1)),'previewImage',],


*/





module.exports = router;
