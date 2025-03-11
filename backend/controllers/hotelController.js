const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getHotels = async (req, res) => {
    try {
        const hotels = await prisma.hotel.findMany();
        res.json({ success: true, hotels });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.createHotel = async (req, res) => {
    try {
        const { name, location, availableRooms, pricePerNight } = req.body;

        if (!name) throw new Error('Hotel name is required');

        const hotel = await prisma.hotel.create({
            data: {
                name,
                location: location || null,
                availableRooms: availableRooms ? parseInt(availableRooms) : null,
                pricePerNight: pricePerNight ? parseFloat(pricePerNight) : null
            }
        });

        res.status(201).json({ success: true, hotel });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};