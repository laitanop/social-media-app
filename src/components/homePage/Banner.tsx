import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { styled } from '@mui/material/styles';

const StyledName = styled(Typography)({
    color: 'black',
});
const StyledEmail = styled(Typography)({
    color: 'black',
    fontWeight: 'normal',
});
const StyledAppBar = styled(AppBar)({
    border: '1px solid #d500f9',
    boxShadow: 'none',
});

type Props = { drawerWidth: number; handleDrawerToggle: () => void };

const Banner = ({ drawerWidth, handleDrawerToggle }: Props) => {
    const [user, loading, error] = useAuthState(auth);

    return (
        <StyledAppBar
            color="transparent"
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
            }}
        >
            <Toolbar>
                <IconButton
                    // color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <div>
                    <StyledName variant="h6" noWrap>
                        {user && user.displayName}
                    </StyledName>
                    <StyledEmail variant="subtitle2" noWrap>
                        {user && user.email}
                    </StyledEmail>
                </div>
            </Toolbar>
        </StyledAppBar>
    );
};

export default Banner;
