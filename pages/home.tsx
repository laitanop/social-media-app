import React, { useState } from 'react';
import SideMenu from '../src/components/sideMenu';
import styles from '../styles/Home.module.css';
import HomePage from '../src/components/homePage/HomePage';

interface Props {
    window?: () => Window;
}

export default function Home(props: Props) {
    return (
        <div className={styles.home}>
            {' '}
            <SideMenu />
            <HomePage />
        </div>
    );
}
