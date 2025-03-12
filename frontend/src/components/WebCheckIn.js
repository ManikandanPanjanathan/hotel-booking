import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, List, ListItem, ListItemText } from '@mui/material';

function WebCheckIn() {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [familyMembers, setFamilyMembers] = useState([]);
    const [name, setName] = useState('');
    const [aadhaar, setAadhaar] = useState('');
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/bookings/${bookingId}`)
            .then(res => res.json())
            .then(data => setBooking(data))
            .catch(error => console.error('Error fetching booking:', error));

        fetch(`http://localhost:3001/familyMembers?bookingId=${bookingId}`)
            .then(res => res.json())
            .then(data => { setFamilyMembers(data) })
            .catch(error => console.error('Error fetching family members:', error));
    }, [bookingId]);

    const handleAddMember = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/familyMembers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookingId: bookingId,
                    name,
                    aadhaar,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                })
            });
            if (response.ok) {
                const newMember = await response.json();
                setFamilyMembers([...familyMembers, newMember]);

                if (familyMembers.length === 0) {
                    await fetch(`http://localhost:3001/bookings/${bookingId}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            status: 'checked-in',
                            updatedAt: new Date().toISOString()
                        })
                    });
                    setBooking({ ...booking, status: 'checked-in' });
                    navigate('/hotels');
                }

                setName('');
                setAadhaar('');
            }
        } catch (error) {
            console.error('Error adding family member:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>Web Check-in (Booking ID: {bookingId})</Typography>
                <Typography>Status: {booking?.status}</Typography>
                <Box component="form" onSubmit={handleAddMember} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Aadhaar Number"
                        value={aadhaar}
                        onChange={(e) => setAadhaar(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={!name || !aadhaar || booking?.status === 'checked-in'}
                    >
                        Add Family Member
                    </Button>
                </Box>
                <List>
                    {familyMembers.map(member => (
                        <ListItem key={member.id}>
                            <ListItemText primary={member.name} secondary={member.aadhaar} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
}

export default WebCheckIn;