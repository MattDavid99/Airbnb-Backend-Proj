// backend/routes/api/session.js
const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Review, User, Spot, SpotImage, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');



const router = express.Router();



router.delete('/:imageId', requireAuth, async (req, res, next) => {

    try {
        const reviewImage = await ReviewImage.findByPk(req.params.imageId, { include: [Review] });

        if (!reviewImage) {
            return res.status(404).json({
                message: "Review Image couldn't be found",
                statusCode: 404
            });
        }


        const review = await Review.findByPk(reviewImage.reviewId)


        if (review.userId != req.user.id) {
            return res.status(403).json({
                message: "Forbidden, you cannot delete an image that you do not own",
                statusCode: 403
            })
        }



        await reviewImage.destroy();

        return res.status(200).json({
            message: "Successfully deleted",
            statusCode: 200
        });



    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete Review Image",
            statusCode: 500
        });
    }
})







module.exports = router;
