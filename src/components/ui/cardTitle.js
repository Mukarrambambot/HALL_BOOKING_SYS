// ui/cardTitle.js
import React from 'react';

function CardTitle({ children, className }) {
  return (
    <h3 className={`card-title ${className}`}>
      {children}
    </h3>
  );
}

export default CardTitle;
