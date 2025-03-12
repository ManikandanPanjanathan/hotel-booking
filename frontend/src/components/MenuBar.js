import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function MenuBar({ toggleSidebar, onLogout }) {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Hotel Booking Dashboard
                </Typography>
                <Button color="inherit" onClick={onLogout}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default MenuBar;
