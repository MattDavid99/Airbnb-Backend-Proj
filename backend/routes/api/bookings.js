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















module.exports = router;
