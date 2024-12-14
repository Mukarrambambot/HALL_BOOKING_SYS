// src/components/ui/dialog.js
import React from 'react';

const Dialog = ({ children, ...props }) => {
    return <div className="dialog" {...props}>{children}</div>;
};

export default Dialog;
