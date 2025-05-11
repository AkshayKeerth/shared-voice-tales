
import React from 'react';

const MicVoice = ({ size = 24, className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      <line x1="12" y1="19" x2="12" y2="23"></line>
      <line x1="8" y1="23" x2="16" y2="23"></line>
      <path d="M20 12v1a8 8 0 0 1-.5 2.8M4 12v1a8 8 0 0 0 .5 2.8"></path>
      <path d="M5 17a9 9 0 0 0 2.1 3M19 17a9 9 0 0 1-2.1 3"></path>
    </svg>
  );
};

export default MicVoice;
