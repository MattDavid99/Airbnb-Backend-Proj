// / backend/routes / api / reviews.js

const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Review, User, Spot, SpotImage, ReviewImage, Booking } = require('../../db/models');
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

// ⬆️⬆️⬆️ Rewritten
// ------------------------------
// router.post('/:reviewId/images', requireAuth, async (req, res, next) => {

//     const review = await Review.findOne({
//         where: { id: req.params.reviewId }
//     })

//     const { url } = req.body

//     if (review) {
//         const newReviewImage = await ReviewImage.create({
//             reviewId: parseInt(req.params.reviewId),
//             url
//         })

//         if (newReviewImage) {
//             // res.status(200).json(newReviewImage)
//             const { id, url } = newReviewImage.toJSON();
//             res.status(200).json({ id, url })
//         }

//     } else {
//         return res.json({
//             message: "Spot couldn't be found",
//             statusCode: 404
//         })
//     }

// })
// ----------------------------------------


// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res, next) => {

    const reviews = await Review.findAll({
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
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                include: [
                    {
                        model: SpotImage,
                        attributes: ['url'],
                        where: { preview: true },
                        required: false
                    }
                ]
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    if (reviews) {
        return res.status(200).json({
            Reviews: reviews
        })
    }


    return res.status(404).json({
        message: "Review couldn't be found",
        statusCode: 404
    })

})







module.exports = router;
