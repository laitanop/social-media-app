import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Login from '../src/authFirebase/login';
export default function Home() {
    return (
        <div className={styles.container}>
            <Login />
        </div>
    );
}
