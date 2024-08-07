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
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 49 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
];


const validateReview = [
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


const validateQueryParameters = [
    check('page')
        .optional()
        .isInt({ min: 1, max: 10 })
        .withMessage('Value must be an integer from 1 to 10')
        .exists({ checkFalsy: false })
        .withMessage(''),

    check('size')
        .optional()
        .isInt({ min: 1, max: 40 })
        .withMessage('Value must be an integer from 1 to 35')
        .exists({ checkFalsy: false })
        .withMessage(''),

    check('minLat')
        .optional()
        .isInt()
        .withMessage('Minimum latitude is invalid'),

    check('maxLat')
        .optional()
        .isInt()
        .withMessage('Maximum latitude is invalid'),

    check('minLng')
        .optional()
        .isInt()
        .withMessage('Minimum longitude is invalid'),

    check('maxLng')
        .optional()
        .isInt()
        .withMessage('Maximum longitude is invalid'),

    check('minPrice')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Minimum price must be greater than or equal to 0'),

    check('maxPrice')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Maximum price must be greater than or equal to 0'),
    handleValidationErrors
]

const router = express.Router();

router.get('/', validateQueryParameters, async (req, res, next) => {
    let where = {}
    const page = req.query.page
    const size = req.query.size
    let limit = size || 40
    let offset = (limit * (page - 1) || 0)

    if (req.query.minLat) where.lat = { [Op.gte]: req.query.minLat }
    if (req.query.maxLat) where.lat = { [Op.lte]: req.query.maxLat }
    if (req.query.minLat && req.query.maxLat) where.lat = { [Op.between]: [req.query.minLat, req.query.maxLat] }
    if (req.query.minLng) where.lng = { [Op.gte]: req.query.minLng }
    if (req.query.maxLng) where.lng = { [Op.lte]: req.query.maxLng }
    if (req.query.minLng && req.query.maxLng) where.lng = { [Op.between]: [req.query.minLng, req.query.maxLng] }
    if (req.query.minPrice) where.price = { [Op.gte]: req.query.minPrice }
    if (req.query.maxPrice) where.price = { [Op.lte]: req.query.maxPrice }
    if (req.query.minPrice && req.query.maxPrice) where.price = { [Op.between]: [req.query.minPrice, req.query.maxPrice] }
    let options = {
        where,
        limit: limit,
        offset: offset,
    }
    const spots = await Spot.scope({ method: ['getAllSpots'] }).findAll(options)
    if (!spots) {
        return res.status(404).json({
            message: "Request Denied",
            statusCode: 404
        })
    }
    if (spots) {
        return res.status(200).json({ Spots: spots, page, size })
    }
});

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
        return res.status(200).json({ Spots: userSpots })
    }
    res.status(400).json({ "message": "userSpots not found" })
});

router.get('/:spotId', async (req, res, next) => {
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
                [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgStarRating']
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

router.post('/', validateSignup, requireAuth, async (req, res, next) => {
    if (req.user) {
        const { address, city, state, country, lat, lng, name, description, price, previewImage, url1, url2, url3, url4 } = req.body
        const ownerId = req.user.id
        const newSpot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price, previewImage })
        const prevImage = await SpotImage.create({ url: previewImage, preview: true, spotId: newSpot.id })

        const imageUrls = [url1, url2, url3, url4];
        for (const url of imageUrls) {
            if (url) {
                await SpotImage.create({ url, preview: false, spotId: newSpot.id });
            }
        }
        const createdSpot = await Spot.findByPk(newSpot.id)
        if (newSpot) return res.status(201).json(createdSpot)
    }
});

router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const { url, preview } = req.body
    const spot = await Spot.findOne({
        where: { id: req.params.spotId }
    })
    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    newImage = await SpotImage.create({
        spotId: parseInt(req.params.spotId),
        url,
        preview
    })
    if (newImage) {
        res.status(200).json(newImage)
    }
})

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

router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    const userSpot = await Spot.findOne({ where: { ownerId: req.user.id, id: req.params.spotId } })
    if (!userSpot) {
        return res.status(403).json({
            message: "Forbidden, you cannot delete a spot that you do not own",
            statusCode: 403
        })
    }
    await spot.destroy()
    res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200
    })
})

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
        const user = await User.findOne({ where: { id: userId }, attributes: ['id', 'firstName', 'lastName'] });
        return res.status(200).json({
            id: newReview.id,
            userId: newReview.userId,
            spotId: newReview.spotId,
            review: newReview.review,
            stars: newReview.stars,
            createdAt: newReview.createdAt,
            updatedAt: newReview.updatedAt,
            User: user
        })
    }
})

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

router.post('/:spotId/bookings', requireAuth, validateBooking, async (req, res, next) => {
    const spotId = +req.params.spotId;
    const userId = req.user.id;
    const { startDate, endDate } = req.body;

    const spot = await Spot.findOne({ where: { id: spotId } });
    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404,
        });
    }
    if (spot.ownerId === userId) {
        return res.status(403).json({
            message: "Forbidden, you cannot book a spot that you own",
            statusCode: 403
        })
    }
    const conflictingBooking = await Booking.findAll({
        where: {
            spotId: spotId,
            [Op.or]: [
                {
                    startDate: { [Op.between]: [startDate, endDate] }
                },
                {
                    endDate: { [Op.between]: [startDate, endDate] }
                },

            ]
        }
    })

    if (conflictingBooking.length > 0) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            statusCode: 403,
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
        })
    }
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

router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;
    const userId = req.user.id;
    try {
        const spot = await Spot.findByPk(spotId)
        if (!spot) {
            return res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }
        const bookings = await Booking.findAll({
            where: { spotId },
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
            },
        });

        if (userId === bookings[0]?.User?.id) {
            res.status(200).json({ Bookings: bookings });
        } else {
            const mappedBookings = bookings.map((booking) => {
                return {
                    spotId: booking.spotId,
                    startDate: booking.startDate,
                    endDate: booking.endDate,
                };
            });
            res.status(200).json({ Bookings: mappedBookings });
        }
    }
    catch (error) {
        next(error);
    }
})

module.exports = router;
