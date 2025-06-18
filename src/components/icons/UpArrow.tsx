import React from 'react';

interface UpArrowProps {
  color?: string;
  size?: number; // in pixels
}

export const UpArrow: React.FC<UpArrowProps> = ({ color = 'white', size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 4L6 10H10V20H14V10H18L12 4Z" fill={color} />
  </svg>
);
