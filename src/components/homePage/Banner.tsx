import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
const StyledName = styled(Typography)({
    color: 'black',
});

const StyledAppBar = styled(AppBar)({
    boxShadow: 'none',
    backgroundColor: 'white',
});

type Props = { drawerWidth: number; handleDrawerToggle: () => void };

const Banner = ({ drawerWidth, handleDrawerToggle }: Props) => {
    const router = useRouter();

    const namePath = router.pathname.slice(1);

    return (
        <StyledAppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
            }}
        >
            <Toolbar>
                <IconButton
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <div>
                    <StyledName variant="h6" noWrap>
                        {namePath[0].toUpperCase() + namePath.slice(1)}
                    </StyledName>
                </div>
            </Toolbar>
        </StyledAppBar>
    );
};

export default Banner;
