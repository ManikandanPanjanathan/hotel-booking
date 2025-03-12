import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { AuthContext } from '../App';

function Register() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                })
            });
            if (response.ok) {
                const newUser = await response.json();
                setUser(newUser);
                navigate('/hotels');
            }
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Register
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Register;