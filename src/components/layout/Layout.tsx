import React from 'react';
import SideMenu from '../sideMenu';
import styles from '../../../styles/Layout.module.css';
type Props = {
    children: any;
};

const Layout = ({ children }: Props) => {
    return (
        <div className={styles.layout_container}>
            <SideMenu />
            {children}
        </div>
    );
};

export default Layout;
