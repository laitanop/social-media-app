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
    color: '#50b7f5',
    cursor: 'pointer',
    display: 'inline-flex',
    '&:hover': {
        color: '#50b7f5',
    },
});
const StyledGoogleButton = styled(Button)({
    color: 'white',
    borderRadius: '100px',
    width: '100%',
    marginBottom: '10px',
    backgroundColor: '#50b7f5',
    padding: '10px',
    '&:hover': {
        backgroundColor: '#e0e0e0',
        boxShadow: 'none',
        border: '2px solid #e0e0e0',
        color: 'black',
    },
});
const StyledTextField = styled(TextField)({
    display: 'flex',
    marginBottom: '20px',

    '& .MuiInputBase-input': {
        border: '1px solid transparent',
        color: 'black',
    },
    '& .MuiInputLabel-root': {
        color: 'black',
    },
    '& .MuiInputLabel-shrink': {
        color: 'black',
    },
    '& .MuiInputLabel-animate': {
        color: 'black',
    },

    '& .MuiInput-underline:before': {
        borderBottomColor: 'black',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'black',
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
