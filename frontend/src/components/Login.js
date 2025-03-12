import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { AuthContext } from '../App';

function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/users?email=${email}`);
            const users = await response.json();
            if (users.length > 0 && users[0].password === password) {
                setUser(users[0]);
                navigate('/hotels');
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
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
                        Login
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;