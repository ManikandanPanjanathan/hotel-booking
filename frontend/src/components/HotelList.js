import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardContent, CardActions, Button, Typography, Divider, List, ListItem, ListItemText, Chip } from '@mui/material';
import { AuthContext } from '../App';

function HotelList() {
    const [hotels, setHotels] = useState([]);
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch('http://localhost:3001/hotels')
            .then(res => res.json())
            .then(data => setHotels(data))
            .catch(error => console.error('Error fetching hotels:', error));

        fetch(`http://localhost:3001/bookings?userId=${user.id}`)
            .then(res => res.json())
            .then(data => setBookings(data))
            .catch(error => console.error('Error fetching bookings:', error));
    }, [user.id]);

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>Available Hotels</Typography>
            <Grid container spacing={4}>
                {hotels.map(hotel => (
                    <Grid item key={hotel.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {hotel.name}
                                </Typography>
                                <Typography color="text.secondary">
                                    {hotel.location}
                                </Typography>
                                <Typography variant="body2">
                                    INR {hotel.pricePerNight}/night
                                </Typography>
                                <Typography variant="body2">
                                    Rooms Available: {hotel.availableRooms}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={() => navigate(`/book/${hotel.id}`)}
                                >
                                    Book Now
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Divider sx={{ my: 4 }} />
            <Typography variant="h4" gutterBottom>My Bookings</Typography>
            {bookings.length === 0 ? (
                <Typography>No bookings found</Typography>
            ) : (
                <List>
                    {bookings.map(booking => (
                        <ListItem key={booking.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <ListItemText
                                primary={hotels.find(h => h.id === booking.hotelId)?.name || 'Unknown Hotel'}
                                secondary={
                                    <>
                                        Check-in: {new Date(booking.checkInDate).toLocaleDateString()} -
                                        Check-out: {new Date(booking.checkOutDate).toLocaleDateString()}
                                        <Chip
                                            label={booking.status}
                                            color={booking.status === 'pending' ? 'warning' : 'success'}
                                            size="small"
                                            sx={{ ml: 1 }}
                                        />
                                    </>
                                }
                            />
                            {booking.status === 'pending' && (
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => navigate(`/checkin/${booking.id}`)}
                                >
                                    Web Check-in
                                </Button>
                            )}
                        </ListItem>
                    ))}
                </List>
            )}
        </Container>
    );
}

export default HotelList;