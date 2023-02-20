// / backend/routes / api / spots.js
const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Sequelize } = require('sequelize');
const { check } = require('express-validator');
const { Op } = require('sequelize');
const { json } = require('sequelize');
const { User, Spot, SpotImage, Review, Booking, ReviewImage } = require('../../db/models');
const app = require('../../app');


const router = express.Router(); // <<-- Don't forget this guy




// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res, next) => {

    // ----------------------------------
    const currentUsersBookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
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
            }
        ],
        attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt']
    });

    if (currentUsersBookings) {
        const bookings = currentUsersBookings.map((booking) => {
            const {
                id,
                spotId,
                userId,
                startDate,
                endDate,
                createdAt,
                updatedAt,
                Spot
            } = booking;
            const previewImage = Spot.SpotImages.length > 0 ? Spot.SpotImages[0].url : null;

            return {
                id,
                spotId,
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
                    previewImage
                },
                userId,
                startDate,
                endDate,
                createdAt,
                updatedAt
            };
        });

        return res.status(200).json({
            Bookings: bookings
        });
    }

    return res.status(404).json({
        message: "Booking couldn't be found",
        statusCode: 404
    });

})











module.exports = router;
