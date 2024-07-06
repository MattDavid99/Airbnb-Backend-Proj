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
        .isLength({ min: 4 })
        .withMessage('Email or username is required'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password is required'),
    handleValidationErrors
];


router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
      const { credential, password } = req.body;

      const user = await User.login({ credential, password });

      if (!user) {
        const err = new Error('Invalid credentials');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return res.status(401).json({
          message: err.message,
          statusCode: err.status,
          errors: err.errors
        })
      }
      else {
        await setTokenCookie(res, user);
        const { id, username, email, firstName, lastName } = user
        return res.json({
          user: { id, username, email, firstName, lastName }
        });
      }
    }
  );


router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);

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


module.exports = router;
