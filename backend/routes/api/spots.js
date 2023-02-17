// / backend/routes / api / spots.js
const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { json } = require('sequelize');
const { User, Spot, SpotImage } = require('../../db/models');
const app = require('../../app');



const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'), // <<-- changed
    check('city') // <<-- changed
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state') // <<-- changed
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        // .isLength({ min: 4 })
        .withMessage('Country is required'),
    check('lat') // <<-- changed
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Latitude is not valid'),
    check('lng') // <<-- changed
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Longitude is not valid'),
    check('name')
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
];






const router = express.Router();


// Get all Spots ❌❌ (need to add "avgRating and previewImage")
router.get('/', async (req, res, next) => {
    const Spots = await Spot.findAll()
    if (Spots) {
        return res.status(200).json({ Spots })
    }
    res.status(400).json({ message: "Could not find Spots" })
});


// Get all Spots owned by the Current User   ❌❌ (need to add "avgRating and previewImage")
router.get('/current', requireAuth, async (req, res, next) => {

    const Spots = await Spot.findAll({
        where: { ownerId: req.user.id }
    })
    if (Spots) {
        return res.status(200).json({ Spots })
    }
    res.status(400).json({ message: "Could not find Spots by this user" })
});


// Get details of a Spot from an id✅✅❌
router.get('/:spotId', requireAuth, async (req, res, next) => {

    const spot = await Spot.findOne({
        where: { id: req.params.spotId },
        include: [
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        ]
    })

    console.log(spot);

    // if (spot) {
    //     return res.status(200).json(spot)
    // }
    if (spot) {
        return res.status(200).json({
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            // numReviews: spot.numReviews, <<-- NEED TO ADD THIS ❌❌❌❌
            // avgStarRating: spot.avgStarRating, <<-- NEED TO ADD THIS ❌❌❌
            SpotImages: spot.SpotImages,
            Owner: spot.User,
        })
    }

    if (!spot) {
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
});





// Create a Spot    ✅✅✅
router.post('/', validateSignup, async (req, res, next) => {

    if (req.user) {
        const Spots = await Spot.findAll()
        const { address, city, state, country, lat, lng, name, description, price } = req.body

        if (Spots) {
            //get owner id from current user
            const ownerId = req.user.id

            const newSpot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price }, {
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            })


            if (newSpot) return res.status(200).json(newSpot)
        }
    }

});




module.exports = router;











// // backend/routes/api/users.js
// const express = require('express')

// const { setTokenCookie, requireAuth } = require('../../utils/auth');
// const { User } = require('../../db/models');




// const router = express.Router();

// // ----------------------------------------------------------------⬇️
// // Sign up
// // router.post('/', validateSignup, async (req, res) => {
// //     const { email, password, username, firstName, lastName } = req.body;
// //     const user = await User.signup({ email, username, password, firstName, lastName });

// //     const token = await setTokenCookie(res, user);


// //     return res.json({
// //         id: user.id,
// //         firstName: user.firstName,
// //         lastName: user.lastName,
// //         email: user.email,
// //         username: user.email,
// //         token
// //     });
// // }
// // );
// router.post(
//     '/',
//     validateSignup,
//     async (req, res) => {
//         const { email, password, username, firstName, lastName } = req.body;

//         try {
//             const user = await User.signup({ email, username, password, firstName, lastName });
//             const token = await setTokenCookie(res, user);

//             return res.json({
//                 id: user.id,
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 email: user.email,
//                 username: user.username,
//                 token
//             });

//         } catch (error) {
//             // return res.json(error)
//             const dynamicError = error.errors.map((ele) => {
//                 if (ele.path == "username") {
//                     return res.json({
//                         message: "User already exists",
//                         statusCode: 403,
//                         errors: {
//                             username: `User with ${ele.value} already exists`
//                         }
//                     })
//                 }
//             })

//         }
//     }
// );









// module.exports = router;
