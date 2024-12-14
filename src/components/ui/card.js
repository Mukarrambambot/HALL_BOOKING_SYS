// src/components/ui/card.js
import React from 'react';

const Card = ({ children, ...props }) => {
    return <div className="card" {...props}>{children}</div>;
};

export default Card;
