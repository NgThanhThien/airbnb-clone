'use client';
import React, { useCallback } from 'react';
import { IconType } from 'react-icons';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
interface CategoryBoxProps {
  label: string;
  description: string;
  icon: IconType;
  selected?: boolean;
}
const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  description,
  icon: Icon,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const handleClick = useCallback(() => {
    let currentQuery = {};
    if (params) currentQuery = qs.parse(params.toString());
    const updateQuery: any = {
      ...currentQuery,
      category: label,
    };
    if (params?.get('category') === label) delete updateQuery.category;
    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updateQuery,
      },
      { skipNull: true }
    );
    router.push(url);
  }, [params, label, router]);

  return (
    <div
      onClick={handleClick}
      className={`
      tw-flex
      tw-flex-col
      tw-items-center
      tw-justify-center
      tw-gap-2
      tw-p-3
      tw-border-2
      hover:tw-text-neutral-800
      tw-transition
      tw-cursor-pointer
      ${selected ? 'tw-border-b-neutral-800' : 'tw-border-transparent'}
      ${selected ? 'tw-text-neutral-800' : 'tw-text-neutral-500'}
    `}
    >
      <Icon size={26} />
      {label}
    </div>
  );
};

export default CategoryBox;
