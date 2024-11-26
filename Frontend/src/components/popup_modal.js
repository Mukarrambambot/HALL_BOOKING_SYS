import { useNavigate } from "react-router-dom";
import React from 'react';


export default function PopupModal({ setShowModal, message, redirectTo }) {
  const navigate = useNavigate();

  const handleClose = () => {
    // Close the modal
    setShowModal(false);
  };

  const handleRedirect = () => {
    // If there's a redirect URL, navigate to that path
    if (redirectTo) {
      navigate(redirectTo);
    } else {
      handleClose();
    }
  };

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/* Content */}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* Body */}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-blueGray-500 text-xl text-center leading-relaxed px-20">
                {message}
              </p>
            </div>
            {/* Footer */}
            <div className="flex items-center justify-end p-3 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 hover:bg-red-50 font-semibold px-4 py-2 text-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                className="text-sky-500 hover:bg-sky-50 font-semibold px-4 py-2 text-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleRedirect}
              >
                {redirectTo ? "Go to Dashboard" : "Close"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal background */}
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}
