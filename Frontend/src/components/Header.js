import React from 'react';
import PaticsLogo from "../assets/Patics_Logo.png";
import PCAS from "../assets/PCAS.jpg";
import HomePageHeader from "./HomePageHeader";

function Header(props) {
  // Background styling for the header
  const backgroundStyle = {
    backgroundImage: `url(${PCAS})`, // Using template literals for better readability
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <header style={backgroundStyle} className="shadow-lg">
      {/* Navigation bar */}
      <nav className="bg-black/75 py-5 dark:bg-gray-800 px-3 sm:px-10">
        <div className="flex flex-wrap justify-between items-center">
          {/* Logo and College Information */}
          <div className="flex items-center">
            <img src={PaticsLogo} className="mr-3 h-20 sm:h-24" alt="Patics Logo" />
            <span className="self-center text-white">
              <div className="font-bold sm:text-2xl">
                PATRICIAN COLLEGE OF ARTS AND SCIENCE
              </div>
              <div className="font-semibold sm:text-xl">
                Madras University, Chennai
              </div>
            </span>
          </div>

          {/* Page Title */}
          <div className="flex items-center">
            <div className="text-white font-bold text-3xl max-[907px]:mt-5 max-[907px]:text-center">
              Campus Hall Booking
            </div>
          </div>
        </div>
        
        {/* Conditional Rendering of HomePageHeader */}
        {props.data.flag && <HomePageHeader />}
      </nav>
    </header>
  );
}

export default Header;
