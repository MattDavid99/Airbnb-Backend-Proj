// / backend/routes / api / bookings.js
const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Sequelize } = require('sequelize');
const { check } = require('express-validator');
const { Op } = require('sequelize');
const { json } = require('sequelize');
const { User, Spot, SpotImage, Review, Booking, ReviewImage } = require('../../db/models');
const app = require('../../app');

const { handleValidationErrors } = require('../../utils/validation');


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





const router = express.Router(); // <<-- Don't forget this guy



// -----------------------------------------------------------------------------------------------------
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
// -----------------------------------------------------------------------------

// Edit a Booking
router.put('/:bookingId', requireAuth, validateBooking, async (req, res, next) => {

    const bookingId = req.params.bookingId;
    const { startDate, endDate } = req.body;

    // Check if the booking exists and belongs to the current user
    const booking = await Booking.findOne({
        where: {
            id: bookingId,
            userId: req.user.id
        }
    });

    console.log(booking);

    if (!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found",
            statusCode: 404
        });
    }

    // Check if the booking is in the future
    const now = new Date();
    const bookingEnd = new Date(booking.endDate);
    if (bookingEnd < now) {
        return res.status(403).json({
            message: "Past bookings can't be modified",
            statusCode: 403
        });
    }

    // Check if the new dates conflict with existing bookings for the same spot
    const bookings = await Booking.findAll({
        where: {
            spotId: booking.spotId,
            startDate: { [Op.lt]: endDate },
            endDate: { [Op.gt]: startDate },
            id: { [Op.ne]: bookingId }
        }
    });

    if (bookings.length > 0) { // <<-- 🟨🟨🟨🟨🟨🟨🟨 (Need to error test this one)
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            statusCode: 403,
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
        });
    }

    // Update the booking with the new dates
    booking.startDate = startDate;
    booking.endDate = endDate;
    await booking.save();

    // Return the updated booking
    res.status(200).json(booking);

})


// Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res, next) => {

    const bookingId = req.params.bookingId;

    // Check if the booking exists and belongs to the current user or the spot belongs to the current user
    const booking = await Booking.findOne({
        where: {
            id: bookingId
        },
        include: {
            model: Spot,
            where: {
                ownerId: req.user.id
            }
        }
    });

    if (!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found",
            statusCode: 404
        });
    }

    // Check if the booking has already started
    const now = new Date();
    const bookingStart = new Date(booking.startDate);
    if (bookingStart < now) {
        return res.status(403).json({
            message: "Bookings that have been started can't be deleted",
            statusCode: 403
        });
    }

    await booking.destroy();

    // Return success response
    res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200
    });
})






module.exports = router;
