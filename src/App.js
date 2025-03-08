import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';

import LoginPage from "./pages/login_page.jsx";
import FriendsPage from "./pages/friends_page.jsx";
import UserPage from "./pages/user_page.jsx";
import RegisterPage from "./pages/register_page.jsx";

import NavBar from "./components/nav.js";
import ProfileButton from './components/profile_button.js';
import Map from "./components/map.js";

import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';

import User from './objects/user.js';
import CurrentUser from './objects/current_user.js';

const MawdsCoords = [-123.25948140418379, 49.26482780906703];
const IKBCoords = [-123.25263272110878, 49.26748965227982];
const FredKaiserCoords = [-123.2500396163436, 49.262310502398094];

var Daniel = new User(1, "danelzha", "Daniel", "Zhang",  MawdsCoords);
var Darius = new User(2, "daralex", "Darius", "Alexander", IKBCoords);
var Tabreek = new User(3, "tabbz", "Tabreek", "Somani", FredKaiserCoords);
var John= new User(4, "jgrey", "John", "Grey", MawdsCoords);

const current_user_1 = new CurrentUser(1, "danelzha", "Daniel", "Zhang", MawdsCoords, [Darius, Tabreek, John]);
const current_user_2 = new CurrentUser(4, "skibbers", "Big", "Dawg", IKBCoords, [Darius, Tabreek, Daniel]);
const current_user_null = new CurrentUser(0, "null", "null", "", [0,0], []);

const current_user = current_user_1;

var UserList = [Daniel, Darius, Tabreek, John];

function App() {

  return (
    <Box className='app_screen'>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/main" replace />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main" element={<Map height={'100%'} map_center={[-123.25470,49.26550]}/>} />
          <Route path="/friends" element={<FriendsPage friendsList={current_user.friends}/>} />
          <Route path="/user/:uid" element={<UserPage userList={UserList} />} />
        </Routes>

        <ProfileButton user={current_user} />
        <NavBar />
      </Router>
    </Box>
  );
}

export default App;