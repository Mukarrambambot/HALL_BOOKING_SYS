import React from 'react';

function Footer() {
  return (
    <footer
      className="bg-gray-900 text-white mt-auto"
      style={{ backgroundColor: "#151515" }} // Dark background for the footer
    >
      <div className="w-full py-5 px-10 md:h-20 md:py-0 sm:px-20 flex items-center md:justify-between justify-center flex-wrap">
        
        {/* Left part with copyright */}
        <span className="text-sm sm:text-base text-center dark:text-white mb-5 sm:mb-0 mr-5">
          Copyright © 2023{" "}
          <span className="font-bold">
            Campus Hall Booking System
          </span>
        </span>

        {/* Right part with developer credit */}
        <span className="text-sm sm:text-base text-center dark:text-white">
          Developed by <strong>AU Web Team</strong>
        </span>
        
        {/* Adding the Patics Logo image */}
        <div className="text-center">
          <img src="/assets/Patics Logo.png" alt="Patics Logo" className="w-24 h-auto" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
