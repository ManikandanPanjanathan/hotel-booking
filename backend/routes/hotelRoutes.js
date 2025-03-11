const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

router.get('/', hotelController.getHotels);
router.post('/registerHotel', hotelController.createHotel);

module.exports = router;