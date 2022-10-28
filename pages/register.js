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
    backgroundColor: '#d500f9',
    '&:hover': {
        backgroundColor: 'white',
        color: '#d500f9',
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
const StyledText = styled(Typography)({
    color: '#d500f9',
    textAlign: 'center',
});

const StyledTextRegister = styled(Typography)({
    color: 'black',
    cursor: 'pointer',
    display: 'inline-flex',
    '&:hover': {
        color: 'white',
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
