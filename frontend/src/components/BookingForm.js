import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AuthContext } from '../App';

function BookingForm() {
    const { hotelId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [checkInDate, setCheckInDate] = React.useState(null);
    const [checkOutDate, setCheckOutDate] = React.useState(null);
    const [hotel, setHotel] = React.useState(null);

    React.useEffect(() => {
        fetch(`http://localhost:3001/hotels/${hotelId}`)
            .then(res => res.json())
            .then(data => setHotel(data))
            .catch(error => console.error('Error fetching hotel:', error));
    }, [hotelId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    hotelId: hotelId,
                    checkInDate: checkInDate.toISOString(),
                    checkOutDate: checkOutDate.toISOString(),
                    status: 'pending',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                })
            });
            if (response.ok) {
                const booking = await response.json();
                navigate(`/checkin/${booking.id}`);
            }
        } catch (error) {
            console.error('Booking failed:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Book {hotel?.name}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }} >
                    <DatePicker
                        label="Check-in Date"
                        value={checkInDate}
                        onChange={(newValue) => setCheckInDate(newValue)}
                        renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                    />
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <DatePicker
                        label="Check-out Date"
                        value={checkOutDate}
                        onChange={(newValue) => setCheckOutDate(newValue)}
                        renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={!checkInDate || !checkOutDate}
                    >
                        Confirm Booking
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default BookingForm;