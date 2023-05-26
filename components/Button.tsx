import React from 'react';
import { IconType } from 'react-icons';
interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}
const Button: React.FC<ButtonProps> = (props) => {
  const { label, onClick, disabled, outline, small, icon: Icon } = props;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        tw-relative
        disabled:tw-opacity-70
        disabled:tw-cursor-not-allowed
        tw-rounded-lg
        hover:tw-opacity-80
        tw-transition
        tw-w-full
        tw-flex 
        tw-items-center
        tw-justify-center
        tw-border-[1px]
        ${outline ? 'tw-bg-white' : 'tw-bg-rose-500'}
        ${outline ? 'tw-border-[#222222]' : 'tw-border-rose-500'}
        ${outline ? 'hover:tw-bg-gray-100' : 'hover:tw-bg-rose-500'}
        ${outline ? 'tw-text-black' : 'tw-text-white'}
        ${small ? 'tw-py-1' : 'tw-py-3'}
        ${small ? 'tw-text-sm' : 'tw-text-md'}
        ${small ? 'tw-font-light' : 'tw-font-semibold'}
      `}
    >
      {Icon && <Icon className="tw-mr-3 tw-absolute tw-left-6 tw-w-5 tw-h-5" />}
      {label}
    </button>
  );
};

export default Button;
