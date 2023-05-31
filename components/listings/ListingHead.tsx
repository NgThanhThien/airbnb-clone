import { SafeUser } from '@/app/types';
import useCountries from '@/hooks/useCountries';
import Image from 'next/image';
import React from 'react';
import Heading from '../Heading';
import HeartButton from '../HeartButton';
interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
}
const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="tw-w-full tw-h-[60vh] tw-overflow-hidden tw-rounded-xl tw-relative">
        <Image
          alt="Image"
          src={imageSrc}
          fill
          className="tw-object-cover tw-w-full"
        />
        <div className="tw-absolute tw-top-5 tw-right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
