import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import { ThemeProvider } from './contexts/ThemeContext';
import Login from './pages/Login';
import Home from './pages/Home';
import AddCourse from './pages/AddCourse';
import ViewCourses from './pages/ViewCourses';
import WatchCourse from './pages/WatchCourse';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Aboutus from './pages/Aboutus';

function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
}