// / backend/routes / api / reviews.js

const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Review, User, Spot, SpotImage, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize')
const Sequelize = require('sequelize')


const router = express.Router();


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




// Add an Image to a Review based on the Review's id ✅✅✅✅ (Maybe come back to make sure everything is working)
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

    if (review.ReviewImages && review.ReviewImages.length > 10) {
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





// // Get all Reviews of the Current User✅✅✅✅✅✅🟨🟨🟨❌❌❌(change the literal)
router.get('/current', requireAuth, async (req, res, next) => {
    const specificUserReviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
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
                    'price',
                    [Sequelize.fn('MAX', Sequelize.col('SpotImages.url')), 'previewImage']
                ],
                include: [
                    {
                        model: SpotImage,
                        attributes: []
                    }
                ]
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            },
            {
                model: SpotImage,
                attributes: []
            }
        ],
        group: ['Review.id', 'User.id', 'Spot.id', 'SpotImages.id'], // <<--  just added this
    });
    if (specificUserReviews) {
        return res.status(200).json({
            Reviews: specificUserReviews
        })
    }

    return res.status(404).json({
        message: "Review couldn't be found",
        statusCode: 404
    })

});



// ----------------------------------------------------------------------------------------------------------------






// Edit a Review✅✅✅✅
router.put('/:reviewId', requireAuth, validateReview, async (req, res, next) => {

    const reviews = await Review.findByPk(req.params.reviewId)

    if (!reviews) {

        return res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404

        })
    }

    const { review, stars } = req.body

    await reviews.update({

        review, stars


    })

    return res.status(200).json(reviews)



})


// Delete a Review ✅✅✅✅
router.delete('/:reviewId', requireAuth, async (req, res, next) => {

    const review = await Review.findByPk(req.params.reviewId)

    if (!review) {

        res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404

        })
    }

    await review.destroy()


    res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200
    })


})










module.exports = router;
