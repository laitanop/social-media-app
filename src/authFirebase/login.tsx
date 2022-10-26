/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth, signInWithGoogle, logInWithEmailAndPassword } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from '../../styles/Login.module.css';
import Link from 'next/link';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';

const StyledButton = styled(Button)({
    borderRadius: '100px',
    width: '100%',
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#ba68c8',
    '&:hover': {
        backgroundColor: 'white',
        color: '#ba68c8',
    },
});
const StyledText = styled(Typography)({
    color: 'white',
});

const StyledGoogleButton = styled(Button)({
    borderRadius: '100px',
    width: '100%',
    marginTop: '20px',
    marginBottom: '30px',
    padding: '10px',
    '&:hover': {
        backgroundColor: 'white',
        color: 'blue',
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
    '& .MuiInput-underline:before': { borderBottomColor: 'white' },
    '& .MuiInput-underline:after': { borderBottomColor: 'white' },
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
        <div className={styles.login}>
            <Container>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={{ xs: 2, md: 4 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    <Grid
                        xs={12}
                        sm={6}
                        md={6}
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        <img
                            src="https://web.zapper.fi/images/?url=https%3A%2F%2Fimg.cryptokitties.co%2F0x06012c8cf97bead5deae237070f9587f8e7a266d%2F1025387.png&width=500&checksum=132e0"
                            alt="Picture of the author"
                        />
                    </Grid>
                    <Grid
                        xs={12}
                        sm={6}
                        md={6}
                        style={{
                            textAlign: 'center',
                        }}
                    >
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
                        <StyledText variant="h6">
                            <Link href="/reset">Forgot Password</Link>
                        </StyledText>

                        <StyledText variant="h5">
                            Don't have an account?{' '}
                            <Link href="/register">Register</Link> now.
                        </StyledText>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};
export default Login;
