import { useRef, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import User from '../objects/user.js';


const ProfileButton= ({user}) => {
    
    if (user.uid == 0) {
        return (
            <></>
        )
    }

    return (
        <Box className='profile_button'>
            <Avatar alt={user.first_name} src='../images/icon.png' />
        </Box>
    )

};


export default ProfileButton;