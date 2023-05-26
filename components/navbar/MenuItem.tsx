import React, { FC } from 'react';

interface MenuItemProps {
  className?: string;
  onClick: () => void;
  label: string;
}
const MenuItem: FC<MenuItemProps> = ({ onClick, label, className }) => {
  return (
    <div
      className={`tw-px-4 tw-py-2 hover:tw-bg-gray-100 tw-cursor-pointer ${className}`}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default MenuItem;
