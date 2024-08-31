import React from 'react';
import { Routes, Route } from 'react-router-dom'; // No need to import BrowserRouter here
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
  return (
    <Container maxWidth="lg">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Container>
  );
};

export default App;
