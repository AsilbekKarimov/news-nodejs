import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useStyles from './styles';
import memories from '../../images/memories.png';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const classes = useStyles();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decodeToken(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const decodeToken = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    const logout = () => {
        localStorage.removeItem('profile');
        setUser(null);
        navigate('/auth');
    };


    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.toolbar}>
                <div className={classes.brandContainer}>
                    <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">NEWS</Typography>
                    <img className={classes.image} src={memories} alt="icon" height="60" />
                </div>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>
                            {user?.result.name.charAt(0)}
                        </Avatar>
                        <Typography style={{ color: 'white' }} className={classes.userName} variant="h6">{user?.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <div>
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
