import React from 'react';

const TinySpinner = ({ size = 'w-7 h-7', color = 'border-white' }) => {
  return (
    <div className={`inline-block ${size} border-2 border-t-transparent ${color} rounded-full animate-spin`}></div>
  );
};

export default TinySpinner;
