import React, { ReactNode, useEffect } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import styles from '../../../styles/SideBar.module.css';

type Props = {
    text?: string;
    icon?: ReactNode;
    handleClick?: () => void;
    active?: boolean;
};

const SideOptions = ({ text, icon, handleClick, active }: Props) => {
    return (
        <div className={styles.sidebarOption}>
            <ListItem disablePadding>
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText
                        primary={text}
                        className={active ? styles.sidebarOptionActive : null}
                    />
                </ListItemButton>
            </ListItem>
        </div>
    );
};

export default SideOptions;
