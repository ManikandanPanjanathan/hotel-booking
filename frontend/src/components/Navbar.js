import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

function Navbar() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);

    const handleLogout = () => {
        setUser(null);
        navigate('/');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Hotel Booking
                </Typography>
                {!user ? (
                    <>
                        <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
                        <Button color="inherit" onClick={() => navigate('/')}>Login</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" onClick={() => navigate('/hotels')}>Hotels</Button>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;