// backend/routes/api/session.js
const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Review, User, Spot, SpotImage, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');



const router = express.Router();



router.delete('/:imageId', requireAuth, async (req, res, next) => {


    try {
        const spotImage = await SpotImage.findByPk(req.params.imageId, { include: [Spot] });

        if (!spotImage) {
            return res.status(404).json({
                message: "Spot Image couldn't be found",
                statusCode: 404
            });
        }

        const spot = await Spot.findByPk(spotImage.spotId)


        if (spot.ownerId != req.user.id) {
            return res.status(403).json({
                message: "Forbidden, you cannot delete an image that you do not own",
                statusCode: 403
            })
        }



        await spotImage.destroy();

        return res.status(200).json({
            message: "Successfully deleted",
            statusCode: 200
        });



    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete Spot Image",
            statusCode: 500
        });
    }


})







module.exports = router;
