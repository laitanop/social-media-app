import React from 'react';
import { useRouter } from 'next/router';
import styles from '../../../styles/Banner.module.css';

type Props = {};

const Banner = (props: Props) => {
    const router = useRouter();

    const namePath = router.pathname.slice(1);

    return (
        <div className={styles.feed}>
            <div className={styles.feed__header}>
                <h2> {namePath[0].toUpperCase() + namePath.slice(1)}</h2>
            </div>
        </div>
    );
};

export default Banner;
