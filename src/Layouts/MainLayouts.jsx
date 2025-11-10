import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router';
import ScrollToTop from '../Components/ScrollToTop';

const MainLayouts = () => {
    return (
      <div>
        <ScrollToTop />
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
};

export default MainLayouts;