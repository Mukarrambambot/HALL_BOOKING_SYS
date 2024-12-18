// ui/cardContent.js
import React from 'react';

function CardContent({ children, className }) {
  return (
    <div className={`card-content ${className}`}>
      {children}
    </div>
  );
}

export default CardContent;
