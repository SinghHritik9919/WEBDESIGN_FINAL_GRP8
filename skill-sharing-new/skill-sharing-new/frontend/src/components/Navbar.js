


import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { Link } from 'react-router-dom';
import { useThemeContext } from '../contexts/ThemeContext';
import { useTheme } from '@mui/material/styles';
import axios from '../api';

function Navbar() {
  const { isAuthenticated, role, userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({ fullName: '', profilePhoto: null });
  const { mode, toggleTheme } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile screens
  const [anchorEl, setAnchorEl] = useState(null); // Manage profile menu state

  useEffect(() => {
    const fetchProfile = async () => {
      if (isAuthenticated) {
        try {
          const response = await axios.get(`/user/profile/${userId}`);
          setProfile({
            fullName: response.data.fullName,
            profilePhoto: response.data.profilePhoto,
          });
        } catch (error) {
          console.error('Error fetching profile:', error.message);
        }
      }
    };

    fetchProfile();
  }, [isAuthenticated, userId]);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/login';
  };

  const getInitials = (name) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="static"
      style={{
        background: 'linear-gradient(90deg, #4b266e 0%, #6b2b92 100%)',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
        marginBottom: '20px',
      }}
    >
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo and Brand */}
        <Typography
          variant="h6"
          style={{
            fontWeight: 700,
            color: 'white',
            fontSize: '24px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              src="/images/logo.png"
              alt="Logo"
              style={{ height: '40px', marginRight: '10px' }}
            />
            ElevateHub
          </Link>
        </Typography>
