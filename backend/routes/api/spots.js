// / backend/routes / api / spots.js
const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Sequelize } = require('sequelize');
const { check } = require('express-validator');
const { Op } = require('sequelize');
const { json } = require('sequelize');
const { User, Spot, SpotImage, Review, Booking, ReviewImage } = require('../../db/models');
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


const validateReview = [ // <<--------------------------- MIght need to add contrants for stars

    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

const validateBooking = [

    check('startDate')
        .exists({ checkFalsy: true })
        .withMessage(''),
    check('endDate')
        .exists({ checkFalsy: true })
        .custom((endDate, { req }) => {
            const startDate = req.body.startDate;
            if (endDate && startDate) {
                if (new Date(endDate) <= new Date(startDate)) {
                    throw new Error('endDate cannot be on or before startDate')
                }
            }
            return true
        })
        .withMessage(''),
    handleValidationErrors
];


const router = express.Router();




// Get all Spots  ✅✅✅✅✅
router.get('/', async (req, res, next) => {


    // -----------------------------------------------------------------------------------
    const Spots = await Spot.findAll({

        attributes: [
            'id',
            'ownerId',
            'address',
            'city',
            'state',
            'country',
            'lat',
            'lng',
            'name',
            'description',
            'price',
            'createdAt',
            'updatedAt',
            [Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 2), 'avgRating'],
            [Sequelize.fn('MAX', Sequelize.col('SpotImages.url')), 'previewImage']
        ],

        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: SpotImage,
                attributes: []
            }
        ],
        group: ['Spot.id', 'SpotImages.id', 'Reviews.spotId'],
    })


    if (Spots) {
        return res.status(200).json({ Spots })
    }
    res.status(400).json({ message: "Could not find Spots" })

});


// Get all Spots owned by the Current User   ✅✅✅✅✅
router.get('/current', requireAuth, async (req, res, next) => {


    const userSpots = await Spot.findAll({
        where: { ownerId: req.user.id },
        attributes: [
            'id',
            'ownerId',
            'address',
            'city',
            'state',
            'country',
            'lat',
            'lng',
            'name',
            'description',
            'price',
            'createdAt',
            'updatedAt',
            [Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 2), 'avgRating'],
            [Sequelize.fn('MAX', Sequelize.col('SpotImages.url')), 'previewImage']
        ],
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: SpotImage,
                attributes: []
            }
        ],
        group: ['Spot.id', 'SpotImages.id', 'Reviews.spotId'],
    })
    if (userSpots) {
        return res.status(200).json(userSpots)
    }
    res.status(400).json({ "message": "userSpots not found" })
});


// Get details of a Spot from an id✅✅✅✅✅✅
router.get('/:spotId', requireAuth, async (req, res, next) => {


    try {
        const spot = await Spot.findByPk(req.params.spotId, {
            attributes: [
                'id',
                'ownerId',
                'address',
                'city',
                'state',
                'country',
                'lat',
                'lng',
                'name',
                'description',
                'price',
                'createdAt',
                'updatedAt',
                [Sequelize.fn('COUNT', Sequelize.col('Reviews.id'),), 'numReviews'],
                [Sequelize.fn('AVG', Sequelize.col('Reviews.stars'),), 'avgStarRating'],
            ],
            include: [
                {
                    model: SpotImage,
                    attributes: ['id', 'url', 'preview']
                },
                {
                    model: User,
                    as: 'Owner',
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: Review,
                    attributes: []
                },
            ],
            group: ['Spot.id', 'SpotImages.id', 'Owner.id', 'Reviews.spotId'],

        })

        if (!spot) {
            return res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }

        return res.status(200).json(spot)

    } catch (err) {
        next(err)
    }

});





// Create a Spot    ✅✅✅
router.post('/', validateSignup, requireAuth, async (req, res, next) => {

    if (req.user) {
        const Spots = await Spot.findAll()
        const { address, city, state, country, lat, lng, name, description, price } = req.body

        if (Spots) {
            //get owner id from current user
            const ownerId = req.user.id

            const newSpot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price })


            if (newSpot) return res.status(201).json(newSpot)
        }
    }

});


// Add an Image to a Spot based on the Spot's id   ✅✅✅❌❌ (something is off here) ERROR MSG IS WRONG
router.post('/:spotId/images', requireAuth, async (req, res, next) => {

    const { url, preview } = req.body


    const spot = await Spot.findAll({
        where: { id: req.params.spotId }
    })
    if (spot) {

        newImage = await SpotImage.create({
            spotId: parseInt(req.params.spotId),
            url,
            preview
        })

        if (newImage) {
            res.status(200).json(newImage)
        }

    } else {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
})
//----------------------------------------



// Edit a Spot ✅✅✅
router.put('/:spotId', requireAuth, validateSignup, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    const { address, city, state, country, lat, lng, name, description, price } = req.body

    await spot.update({
        address, city, state, country, lat, lng, name, description, price
    })

    return res.status(200).json(spot)
})


// Delete a Spot ✅✅✅✅
router.delete('/:spotId', requireAuth, async (req, res, next) => {

    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    await spot.destroy()

    res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200
    })


})


// Create a Review for a Spot based on the Spot's id ✅✅❌❌ (Need to at "createdAt updatedAt")
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {


    const { review, stars } = req.body
    const spotId = parseInt(req.params.spotId)
    const userId = req.user.id


    const spot = await Spot.findOne({ where: { id: spotId } })

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }


    const existingReview = await Review.findOne({ where: { userId, spotId } })

    if (existingReview) {
        return res.status(403).json({
            message: "User already has a review for this spot",
            statusCode: 403
        })
    }


    const newReview = await Review.create({ userId, spotId, review, stars })

    if (newReview) {
        return res.status(200).json({
            id: newReview.id,
            userId: newReview.userId,
            spotId: newReview.spotId,
            review: newReview.review,
            stars: newReview.stars,
        })
    }

})


// Get all Reviews by a Spot's id ✅✅✅✅
router.get('/:spotId/reviews', async (req, res, next) => {



    try {
        const reviews = await Review.findAll({

            where: { spotId: req.params.spotId },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: ReviewImage,
                    attributes: ['id', 'url']
                }
            ]
        });

        const spot = await Spot.findOne({ where: { id: req.params.spotId } })

        if (!spot) {
            return res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }




        return res.status(200).json({
            Reviews: reviews.map(review => ({
                id: review.id,
                userId: review.userId,
                spotId: review.spotId,
                review: review.review,
                stars: review.stars,
                createdAt: review.createdAt,
                updatedAt: review.updatedAt,
                User: review.User,
                ReviewImages: review.ReviewImages
            }))
        });
    } catch (error) {
        next(error);
    }

})


// Create a Booking from a Spot based on the Spot's id  ✅✅✅✅🟨🟨🟨❓ (Double check this one for sure)

router.post('/:spotId/bookings', requireAuth, validateBooking, async (req, res, next) => {

    const spotId = parseInt(req.params.spotId);
    const userId = req.user.id;
    const { startDate, endDate } = req.body;

    // Check if the spot exists
    const spot = await Spot.findOne({ where: { id: spotId } });
    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404,
        });
    }

    // Check Conflict
    const conflictingBooking = await Booking.findOne({
        where: {
            spotId,
            [Op.or]: [
                {
                    startDate: { [Op.lte]: startDate },
                    endDate: { [Op.gte]: startDate },
                },
                {
                    startDate: { [Op.lte]: endDate },
                    endDate: { [Op.gte]: endDate },
                },
                {
                    startDate: { [Op.gte]: startDate },
                    endDate: { [Op.lte]: endDate },
                },
            ],
        },
    });

    if (conflictingBooking) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            statusCode: 403,
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking",
            },
        })
    }



    // Create the new booking
    const newBooking = await Booking.create({
        spotId,
        userId,
        startDate,
        endDate,
    });

    if (newBooking) {
        return res.status(200).json({
            id: newBooking.id,
            spotId: newBooking.spotId,
            userId: newBooking.userId,
            startDate: newBooking.startDate,
            endDate: newBooking.endDate,
            createdAt: newBooking.createdAt,
            updatedAt: newBooking.updatedAt,
        });
    }

})









module.exports = router;
