import React from 'react';

import styles from '../../../styles/Layout.module.css';
import Banner from '../homePage/Banner';
type Props = {
    children: any;
};

const FeedLayout = ({ children }: Props) => {
    return (
        <div className={styles.feed}>
            <Banner />
            {children}
        </div>
    );
};

export default FeedLayout;
