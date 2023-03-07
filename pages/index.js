import styles from '../styles/Home.module.css';

import Login from '../src/authFirebase/login';
export default function Home() {
    return (
        <div className={styles.container}>
            <Login />
        </div>
    );
}
