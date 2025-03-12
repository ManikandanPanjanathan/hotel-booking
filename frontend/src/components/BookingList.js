import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Alert, Grid } from '@mui/material';

function BookingList({ user, onBookingSelect }) {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`http://localhost:5000/api/bookings/${user.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setBookings(data.bookings);
                } else {
                    setError(data.error);
                }
            })
            .catch(() => setError('Failed to fetch bookings'));
    }, [user]);

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Your Bookings
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {bookings.length === 0 ? (
                <Typography variant="body1">No bookings yet</Typography>
            ) : (
                <Grid container spacing={2}>
                    {bookings.map((booking) => (
                        <Grid item xs={12} sm={6} md={4} key={booking.id}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6">{booking.hotel.name}</Typography>
                                    <Typography variant="body2">
                                        Check-in: {new Date(booking.checkInDate).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2">
                                        Check-out: {new Date(booking.checkOutDate).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2">
                                        Status: {booking.status}
                                    </Typography>
                                    {booking.status === 'pending' && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => onBookingSelect(booking)}
                                            sx={{ mt: 1 }}
                                        >
                                            Proceed to Check-in
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    );
}

export default BookingList;
