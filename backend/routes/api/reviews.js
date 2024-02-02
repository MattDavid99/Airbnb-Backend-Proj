// / backend/routes / api / reviews.js

const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Review, User, Spot, SpotImage, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize')
const { literal } = require('sequelize')
const Sequelize = require('sequelize')


const router = express.Router();


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

router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const review = await Review.findOne({
        where: { id: req.params.reviewId },
        include: [
            {
                model: ReviewImage,
                as: 'ReviewImages'
            }
        ]
    })

    if (!review) {
        return res.status(404).json({
            message: 'Review not found',
            statusCode: 404
        })
    }

    if (review.ReviewImages && review.ReviewImages.length >= 10) {
        return res.status(403).json({
            message: 'Maximum number of images for this resource was reached',
            statusCode: 403
        })
    }

    const { url } = req.body

    const newReviewImage = await ReviewImage.create({
        reviewId: req.params.reviewId,
        url
    })
    if (newReviewImage) {
        res.status(200).json({
            id: newReviewImage.id,
            url: newReviewImage.url
        })
    }
})


router.get('/current', requireAuth, async (req, res, next) => {
    const currentUsersReviews = await Review.findAll({
        where: { userId: req.user.id },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
            },
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                include: [
                    {
                        model: SpotImage,
                        attributes: ['url'],
                        where: { preview: true },
                        required: false,
                    },
                ],
            },
            { model: ReviewImage, attributes: ['id', 'url'] },
        ],
        attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt'],
    });

    if (currentUsersReviews) {
        const reviewsData = currentUsersReviews.map((review) => {
            const {
                id,
                userId,
                spotId,
                review: reviewText,
                stars,
                createdAt,
                updatedAt,
                User,
                Spot,
                ReviewImages,
            } = review.toJSON();

            const previewImage = Spot.SpotImages.length > 0 ? Spot.SpotImages[0].url : null;

            return {
                id,
                userId,
                spotId,
                review: reviewText,
                stars,
                createdAt,
                updatedAt,
                User,
                Spot: {
                    id: Spot.id,
                    ownerId: Spot.ownerId,
                    address: Spot.address,
                    city: Spot.city,
                    state: Spot.state,
                    country: Spot.country,
                    lat: Spot.lat,
                    lng: Spot.lng,
                    name: Spot.name,
                    price: Spot.price,
                    previewImage,
                },
                ReviewImages,
            };
        });
        return res.status(200).json({ Reviews: reviewsData });
    }
    const err = new Error("Reviews couldn't be found");
    err.statusCode = 404;
    return next(err);
});

router.put('/:reviewId', requireAuth, validateReview, async (req, res, next) => {
    const reviews = await Review.findByPk(req.params.reviewId)
    if (!reviews) {
        return res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404

        })
    }
    if (+review.userId != +req.user.id) {
        return res.status(403).json({
            message: "Forbidden, you cannot edit a review that you do not own",
            statusCode: 403
        })
    }
    const { review, stars } = req.body
    await reviews.update({
        review, stars
    })
    return res.status(200).json(reviews)
})


router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId)
    if (!review) {
        res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
    if (+review.userId != +req.user.id) {
        return res.status(403).json({
            message: "Forbidden, you cannot delete a review that you do not own",
            statusCode: 403
        })
    }

    await review.destroy()
    res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200
    })
})


module.exports = router;
