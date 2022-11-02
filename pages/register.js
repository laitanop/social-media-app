import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import {
    auth,
    registerWithEmailAndPassword,
    signInWithGoogle,
} from '../src/firebase';
import styles from '../styles/Register.module.css';
const StyledButtonRegister = styled(Button)({
    color: 'white',
    borderRadius: '100px',
    width: '100%',
    marginBottom: '10px',
    padding: '10px',
    color: 'white',
    backgroundColor: '#50b7f5',
    '&:hover': {
        backgroundColor: '#e0e0e0',
        boxShadow: 'none',
        border: '2px solid #e0e0e0',
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
const StyledText = styled(Typography)({
    color: '#50b7f5',
    textAlign: 'center',
});

const StyledTextRegister = styled(Typography)({
    color: '#50b7f5',
    cursor: 'pointer',
    display: 'inline-flex',
    '&:hover': {
        color: '#50b7f5',
    },
});
function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();
    const register = () => {
        if (!name) alert('Please enter name');
        registerWithEmailAndPassword(name, email, password);
    };
    useEffect(() => {
        if (loading) return;
        if (user) router.push('/home');
    }, [user, loading, router]);
    return (
        <div className={styles.register}>
            <div className={styles.register__container}>
                <StyledTextField
                    id="outlined-basic"
                    label="Full Name"
                    variant="standard"
                    type="text"
                    className={styles.register__textBox}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <StyledTextField
                    id="outlined-basic"
                    type="text"
                    variant="standard"
                    className={styles.register__textBox}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="E-mail Address"
                />
                <StyledTextField
                    id="outlined-basic"
                    type="password"
                    variant="standard"
                    className={styles.register__textBox}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                />
                <StyledButtonRegister onClick={register}>
                    Register
                </StyledButtonRegister>
                <StyledGoogleButton onClick={signInWithGoogle}>
                    Register with Google
                </StyledGoogleButton>
                <StyledText>
                    Already have an account?{' '}
                    <StyledTextRegister>
                        <Link href="/"> Login</Link>
                    </StyledTextRegister>{' '}
                    now.
                </StyledText>
            </div>
        </div>
    );
}
export default Register;
