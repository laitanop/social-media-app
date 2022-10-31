import React, { useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { auth, logout } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import LogoutIcon from '@mui/icons-material/Logout';
type Props = {};

const SideMenu = (props: Props) => {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        if (loading) {
            return;
        }
        if (!user) router.push('/');
    }, [user, loading, router]);

    return (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {['Home'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={logout}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={'logout'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );
};

export default SideMenu;
