'use client';
import React from 'react';
import { IconType } from 'react-icons';
interface ListingCategoryProps {
  icon: IconType;
  label: string;
  description: string;
}
const ListingCategory: React.FC<ListingCategoryProps> = ({
  icon: Icon,
  label,
  description,
}) => {
  return (
    <div className="tw-flex tw-flex-col tw-gap-6">
      <div className="tw-flex tw-flex-row tw-items-center tw-gap-4">
        <Icon className="tw-text-neutral-600" size={40} />
        <div className="tw-flex tw-flex-col">
          <div className="tw-text-lg tw-font-semibold">{label}</div>
          <div className="tw-text-neutral-500 tw-font-light">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
