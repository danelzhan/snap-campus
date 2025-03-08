import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import NavBar from "../components/nav";

import { Avatar, List, ListItem, Tab } from "@mui/material";
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';

import User from '../objects/user.js';

function FriendsPage({friendsList}) {

    return(
        <FriendsReel friends={friendsList} />
    )

}

const FriendsReel = ({friends}) => {
    return(
        <Box
        sx={{
            marginTop: '2rem',
            maxHeight: '85%',
            overflow: 'scroll'
        }}>
        {friends.map((friend, index) => (
          <FriendCard friend={friend}/>
        ))}
        </Box>
    )
}

const FriendCard = ({friend}) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/user/${friend.uid}`);
    };

    return (
        <ThemeProvider
          theme={{
            palette: {
              primary: {
                main: '#007FFF',
                dark: '#0066CC',
              },
            },
          }}
        >
            <Box 
            className='friend_card'
            sx={{
                width: '18rem',
                height: '6rem',
                borderRadius: '10px',
                padding: '2vh',
                bgcolor: 'primary.main',
                '&:hover': {
                bgcolor: 'primary.dark',
                },
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: "1rem",
                color: 'white'
            }}
            onClick={handleClick}>
                
              {friend.first_name} {friend.last_name}


            </Box>
        </ThemeProvider>
      );
}

export default FriendsPage;
