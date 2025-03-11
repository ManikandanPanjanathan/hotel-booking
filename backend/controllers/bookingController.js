const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createBooking = async (req, res) => {
    try {
        const { userId, hotelId, checkInDate, checkOutDate } = req.body;
        if (!userId || !hotelId || !checkInDate || !checkOutDate) {
            throw new Error('All booking fields are required');
        }
        const booking = await prisma.booking.create({
            data: {
                userId: parseInt(userId),
                hotelId: parseInt(hotelId),
                checkInDate: new Date(checkInDate),
                checkOutDate: new Date(checkOutDate),
                status: 'pending'
            }
        });
        res.json({ success: true, booking });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany({
            where: { userId: parseInt(req.params.userId) },
            include: { hotel: true, familyMembers: true }
        });
        res.json({ success: true, bookings });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.checkIn = async (req, res) => {
    try {
        const { familyMembers } = req.body;
        if (!familyMembers || !familyMembers.length) {
            throw new Error('At least one family member is required for check-in');
        }
        const booking = await prisma.booking.update({
            where: { id: parseInt(req.params.bookingId) },
            data: {
                status: 'checked-in',
                familyMembers: {
                    create: familyMembers.map(member => ({
                        name: member.name,
                        aadhaar: member.aadhaar
                    }))
                }
            },
            include: { hotel: true, familyMembers: true }
        });
        res.json({ success: true, booking });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};