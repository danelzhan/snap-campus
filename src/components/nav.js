import * as React from 'react';
import { Navigate, useNavigate } from "react-router-dom";

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import Box from '@mui/material/Box';
import GroupIcon from '@mui/icons-material/Group';
import GlobeIcon from '@mui/icons-material/Public';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

const NavBar= () => {

    const navigate = useNavigate();
    const HandleFriend = () => {
        navigate('/friends');
    };
    const HandleMap = () => {
        navigate('/main');
    };

    const [value, setValue] = React.useState(1);

    return (
        <Box className="navigation_bar" sx={{ width: '100vw' }}>
            <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            >
            <BottomNavigationAction onClick={HandleFriend} label="" icon={<GroupIcon />} />
            <BottomNavigationAction onClick={HandleMap} label="" icon={<GlobeIcon />} />
            <BottomNavigationAction label="" icon={<EventAvailableIcon />} />
            </BottomNavigation>
        </Box>
    );
};

export default NavBar;