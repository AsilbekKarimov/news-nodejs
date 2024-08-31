import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import { auth, provider } from '../Firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AUTH } from '../../constants/actionTypes';
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const googleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const user = result.user;
                const token = await user.getIdToken();
                const profile = {
                    name: user.displayName,
                    email: user.email,
                    picture: user.photoURL,
                };

                try {
                    dispatch({ type: AUTH, data: { result: profile, token } });
                    navigate('/');
                } catch (error) {
                    console.log(error);
                }
            })
            .catch((error) => {
                console.log('Google Sign In was unsuccessful. Try again later');
                console.log(error);
            });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography style={{ color: 'white' }} component="h1" variant="h5">
                    {isSignup ? 'Sign up' : 'Sign in'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        color="default"
                        className={classes.googleButton}
                        onClick={googleSignIn}
                        startIcon={<FcGoogle />}
                        style={{
                            backgroundColor: 'white',
                            color: '#3c4043',
                            textTransform: 'none',
                            borderColor: '#dadce0',
                            borderRadius: '5px',
                        }}
                    >
                        Sign in with Google
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button style={{ color: '#d5d5d5' }} onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;