import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth, logout } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from '../../styles/Login.module.css';

const Logout = () => {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();
    useEffect(() => {
        if (loading) {
            return;
        }
        if (!user) router.push('/');
    }, [user, loading, router]);
    return (
        <div className={styles.logout}>
            <button className={styles.login__google} onClick={logout}>
                Logout
            </button>
        </div>
    );
};
export default Logout;
