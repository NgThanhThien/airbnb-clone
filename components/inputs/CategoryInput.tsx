'use client';
import React from 'react';
import { IconType } from 'react-icons/lib';

interface CategoryInputProps {
  label: string;
  icon: IconType;
  selected?: boolean;
  onClick: (value: string) => void;
}
const CategoryInput: React.FC<CategoryInputProps> = ({
  label,
  icon: Icon,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        tw-rounded-xl 
        tw-border-2 
        tw-p-4 
        tw-flex 
        tw-flex-col 
        tw-gap-3 
        hover:tw-border-[#222222] 
        tw-transition 
        tw-cursor-pointer
        ${selected ? 'tw-border-[#222222]' : 'tw-border-neutral-200'}
      `}
    >
      <Icon size={30} />
      <div className="tw-font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
