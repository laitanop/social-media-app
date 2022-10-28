/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
    auth,
    signInWithGoogle,
    logInWithEmailAndPassword,
    signInWithFacebook,
} from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from '../../styles/Login.module.css';
import Link from 'next/link';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { Typography, Box } from '@mui/material';
import NoSsr from '@mui/material/NoSsr';
const StyledButton = styled(Button)({
    borderRadius: '100px',
    width: '100%',
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#d500f9',
    '&:hover': {
        backgroundColor: 'white',
        color: '#d500f9',
    },
});
const StyledText = styled(Typography)({
    color: 'white',
    textAlign: 'center',
});
const StyledTextApp = styled(Typography)({
    color: '#d500f9',
    textAlign: 'center',
    fontWeight: 'bold',
});
const StyledTextRegister = styled(Typography)({
    color: 'black',
    cursor: 'pointer',
    display: 'inline-flex',
    '&:hover': {
        color: 'white',
    },
});
const StyledGoogleButton = styled(Button)({
    borderRadius: '100px',
    width: '100%',
    marginTop: '20px',
    backgroundColor: 'black',
    padding: '10px',
    '&:hover': {
        backgroundColor: 'white',
        color: 'blue',
    },
});
const StyledFacebookButton = styled(Button)({
    borderRadius: '100px',
    width: '100%',
    marginTop: '20px',
    marginBottom: '30px',
    padding: '10px',
    backgroundColor: '#304ffe',
    '&:hover': {
        backgroundColor: 'white',
        color: '#304ffe',
    },
});
const StyledTextField = styled(TextField)({
    display: 'flex',
    marginBottom: '20px',
    '& .MuiInputBase-input': {
        border: '1px solid transparent',
        color: 'white',
    },
    '& .MuiInputLabel-root': {
        color: 'white',
    },
    '& .MuiInputLabel-shrink': {
        color: 'white',
    },
    '& .MuiInputLabel-animate': {
        color: 'white',
    },

    '& .MuiInput-underline:before': {
        borderBottomColor: 'white',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
    },
});
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();
    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) router.push('/home');
    }, [user, loading, router]);
    return (
        <NoSsr>
            <div className={styles.login}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                >
                    <Grid container spacing={3}>
                        <Grid xs={12} md={12}>
                            <StyledTextApp variant="h2">
                                Join to the Social Media App
                            </StyledTextApp>
                        </Grid>
                        <Grid xs={12} md={6}>
                            <img
                                className={styles.loginImg}
                                src="https://web.zapper.fi/images/?url=https%3A%2F%2Fimg.cryptokitties.co%2F0x06012c8cf97bead5deae237070f9587f8e7a266d%2F1025387.png&width=500&checksum=132e0"
                                alt="Picture of the author"
                            />
                        </Grid>
                        <Grid xs={12} md={6}>
                            <StyledTextField
                                id="outlined-basic"
                                label="E-mail Address"
                                variant="standard"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <br />
                            <StyledTextField
                                id="outlined-basic"
                                type="password"
                                label="Password"
                                variant="standard"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <StyledButton
                                variant="contained"
                                onClick={() =>
                                    logInWithEmailAndPassword(email, password)
                                }
                            >
                                Login
                            </StyledButton>
                            <StyledGoogleButton
                                variant="contained"
                                onClick={signInWithGoogle}
                            >
                                Login with Google
                            </StyledGoogleButton>
                            <StyledFacebookButton
                                variant="contained"
                                onClick={signInWithFacebook}
                            >
                                Login with Facebook
                            </StyledFacebookButton>

                            <StyledText variant="h6">
                                <Link href="/reset">Forgot Password</Link>
                            </StyledText>
                            <StyledText variant="h5">
                                Don't have an account?{' '}
                                <Link href="/register">
                                    <StyledTextRegister variant="h6">
                                        Register
                                    </StyledTextRegister>
                                </Link>{' '}
                                now.
                            </StyledText>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </NoSsr>
    );
};
export default Login;
