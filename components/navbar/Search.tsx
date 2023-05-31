'use client';
import useCountries from '@/hooks/useCountries';
import useSearchModal from '@/hooks/useSearchModal';
import { useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';
import { differenceInDays } from 'date-fns';

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get('locationValue');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return 'Anywhere';
  }, [locationValue, getByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return 'Any Week';
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return 'Add Guests';
  }, [guestCount]);
  return (
    <div
      className="tw-flex tw-flex-row tw-items-center tw-border tw-rounded-full tw-transition tw-shadow hover:tw-shadow-md tw-px-2 tw-cursor-pointer tw-h-12"
      onClick={searchModal.onOpen}
    >
      <div className="tw-px-4 tw-font-semibold tw-border-r">
        {locationLabel}
      </div>
      <div className="tw-px-4 tw-font-semibold tw-border-r">
        {durationLabel}
      </div>
      <div className="tw-px-4">{guestLabel}</div>
      <div className="tw-p-2 tw-rounded-full tw-bg-rose-500 tw-text-white">
        <BiSearch size={18} />
      </div>
    </div>
  );
};

export default Search;
