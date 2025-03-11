const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) throw new Error('Email and password are required');
        const hashedPassword = await bcrypt.hash(password, 15);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword }
        });
        res.json({ success: true, user: { id: user.id, email: user.email } });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) throw new Error('Email and password are required');

        const user = await prisma.user.findUnique({
            where: { email }
        });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid password');

        res.json({ success: true, user: { id: user.id, email: user.email } });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};