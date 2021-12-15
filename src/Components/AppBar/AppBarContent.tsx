import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';

interface AppBarProps {
    title: string
}

const AppBarContent = (props: AppBarProps) => {

    return (
        <>
            <CssBaseline />
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" component="div">
                        {props.title}
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default AppBarContent;