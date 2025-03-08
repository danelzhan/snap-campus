import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import NavBar from "../components/nav";

import { Avatar, List, ListItem, Tab } from "@mui/material";
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';

import User from '../objects/user.js';
import Map from '../components/map.js';

function UserPage({ userList }) {
    const { uid } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const foundUser = userList.find(u => u.uid === parseInt(uid));
        setUser(foundUser);
    }, [uid, userList]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <Box 
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100vh',
            width: '100vw'
        }}>

            <Box
            sx={{
                width: '100%',
                height: '34%',
            }}><Map map_height={'40%'} map_center={user.location} /></Box>

            <Avatar
            sx={{
                width: '8rem',
                height: '8rem'
            }}
            alt={user.first_name} src='../images/icon.png' />
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                fontSize: '1.5rem',
                marginTop: '-1rem'
            }}>
                <p>{user.first_name} {user.last_name}<br/> @{user.username}</p>
            </Box>
        </Box>
    );
}

export default UserPage;