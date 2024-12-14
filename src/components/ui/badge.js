// src/components/ui/badge.js
import React from 'react';

const Badge = ({ children, ...props }) => {
    return <span className="badge" {...props}>{children}</span>;
};

export default Badge;
