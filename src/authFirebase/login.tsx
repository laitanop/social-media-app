import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth, signInWithGoogle } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from '../../styles/Login.module.css';

const Login = () => {
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
            <div className="login__container">
                <br />
                <button
                    className={styles.login__google}
                    onClick={signInWithGoogle}
                >
                    Login with Google
                </button>
            </div>
        </div>
    );
};
export default Login;
