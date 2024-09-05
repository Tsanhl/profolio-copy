"use client";
import React from 'react'

interface MagicButtonProps {
  title: string;
  icon?: React.ReactNode;
  position: 'left' | 'right';
  size?: 'small' | 'medium' | 'large'; // Add size prop
}

const MagicButton: React.FC<MagicButtonProps> = ({ title, icon, position, size = 'medium' }) => {
  const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 ease-in-out ${sizeClasses[size]}`}
    >
      {position === 'left' && icon && <span className="mr-2">{icon}</span>}
      {title}
      {position === 'right' && icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default MagicButton;
