// src/components/ui/use-toast.js
import React from 'react';

const useToast = () => {
    const showToast = (message) => {
        alert(message);
    };
    return { showToast };
};

export default useToast;
