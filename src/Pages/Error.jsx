import React from 'react';
import Card from '../Components/Card';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link } from 'react-router';

const Error = () => {
    return (
      <div>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4  ">
          <Card />
          <Link
            to="/"
            className="btn bg-[#00a1b7] text-white border-none hover:bg-primary-focus"
          >
            Back to Home
          </Link>
        </div>

        <Footer />
      </div>
    );
};

export default Error;