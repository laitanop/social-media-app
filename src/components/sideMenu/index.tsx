import React, { useEffect } from 'react';

import Divider from '@mui/material/Divider';

import { auth, logout } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import LogoutIcon from '@mui/icons-material/Logout';
import SideOptions from './SideOptions';
import HomeIcon from '@mui/icons-material/Home';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TwitterIcon from '@mui/icons-material/Twitter';
import styles from '../../../styles/SideBar.module.css';
import { Button } from '@mui/material';
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

    const handleClick = (route: any) => {
        router.push(`/${route}`);
    };
    const namePath = router.pathname.slice(1).toLocaleLowerCase();
    return (
        <div className={styles.sidebar}>
            <SideOptions
                icon={<TwitterIcon className={styles.sidebar__twitterIcon} />}
            />

            <SideOptions
                active={namePath === 'home'}
                text="Home"
                icon={<HomeIcon />}
                handleClick={() => handleClick('home')}
            />
            <SideOptions
                text="Explore"
                active={namePath === 'explorer'}
                icon={<Grid3x3Icon />}
                handleClick={() => handleClick('explorer')}
            />
            <SideOptions
                text="Notifications"
                icon={<NotificationsNoneIcon />}
            />
            <SideOptions text="Messages" icon={<ForwardToInboxIcon />} />
            <SideOptions text="Bookmarks" icon={<TurnedInNotIcon />} />
            <SideOptions text="Lists" icon={<ListAltIcon />} />
            <SideOptions text="Profile" icon={<PermIdentityIcon />} />
            <SideOptions text="More" icon={<MoreHorizIcon />} />
            <Divider />
            <SideOptions
                text="Logout"
                icon={<LogoutIcon />}
                handleClick={logout}
            />
            <Button
                variant="outlined"
                className={styles.sidebar__tweet}
                fullWidth
            >
                Tweet
            </Button>
        </div>
    );
};

export default SideMenu;
