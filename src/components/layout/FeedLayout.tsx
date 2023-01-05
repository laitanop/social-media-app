import React from 'react';

import styles from '../../../styles/Layout.module.css';
import Banner from '../homePage/Banner';
type Props = {
    children: any;
};

const FeedLayout = ({ children }: Props) => {
    return (
        <div>
            <Banner />
            <div className={styles.children}>{children}</div>
        </div>
    );
};

export default FeedLayout;
