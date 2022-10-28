import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';
import TextField from '@mui/material/TextField';
import { sendPasswordReset } from '../src/firebase';
import styles from '../styles/Reset.module.css';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
const StyledTextRegister = styled(Typography)({
    color: '#d500f9',
    cursor: 'pointer',
    display: 'inline-flex',
    '&:hover': {
        color: 'black',
    },
});
const StyledGoogleButton = styled(Button)({
    color: 'white',
    borderRadius: '100px',
    width: '100%',
    marginBottom: '10px',
    backgroundColor: 'black',
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

function Reset() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const resetPassword = async () => {
        const result = await sendPasswordReset(email);
        if (result === 'Password reset link sent!') {
            router.push('/home');
        }
        setMessage(result);
    };
    return (
        <div className={styles.reset}>
            <div className={styles.reset__container}>
                <StyledTextField
                    type="text"
                    variant="standard"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="E-mail Address"
                />
                <StyledGoogleButton onClick={() => resetPassword()}>
                    Send password reset email
                </StyledGoogleButton>
                <div>
                    Don't have an account?{' '}
                    <StyledTextRegister>
                        <Link href="/register"> Register</Link>
                    </StyledTextRegister>{' '}
                    now.
                </div>
                {message}
            </div>
        </div>
    );
}
export default Reset;
