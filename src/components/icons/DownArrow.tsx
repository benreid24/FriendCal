import React from 'react';

interface DownArrowProps {
  color?: string;
  size?: number; // in pixels
}

export const DownArrow: React.FC<DownArrowProps> = ({ color = 'white', size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 20L18 14H14V4H10V14H6L12 20Z" fill={color} />
  </svg>
);
