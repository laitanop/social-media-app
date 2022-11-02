import React from 'react';
import Banner from './Banner';
import CollectionMessage from './CollectionMessage';
import Message from './Message';
import styles from '../../../styles/HomePage.module.css';
type Props = {};

const HomePage = (props: Props) => {
    return (
        <div className={styles.feed}>
            <Banner />
            <Message />
            <CollectionMessage />
        </div>
    );
};
export default HomePage;
