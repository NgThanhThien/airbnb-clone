'use client';
import React, { useCallback, useMemo } from 'react';
import { Listing, Reservation } from '@prisma/client';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import useCountries from '@/hooks/useCountries';
import { format } from 'date-fns';
import Image from 'next/image';
import HeartButton from '../HeartButton';
import Button from '../Button';
interface ListingCardProps {
  currentUser: SafeUser | null;
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  actionLabel?: string;
  actionId?: string;
  disabled?: boolean;
}
const ListingCard: React.FC<ListingCardProps> = ({
  currentUser,
  data,
  reservation,
  onAction,
  actionId = '',
  actionLabel,
  disabled,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;
      onAction?.(actionId);
    },
    [actionId, disabled, onAction]
  );
  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice;

    return data.price;
  }, [data.price, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  console.log(data);
  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="tw-col-span-1 tw-cursor-pointer tw-group"
    >
      <div className="tw-flex tw-flex-col tw-gap-2 tw-w-full">
        <div className="tw-aspect-square tw-w-full tw-relative tw-overflow-hidden tw-rounded-xl">
          <Image
            fill
            alt="listing"
            src={data.imageSrc}
            className="tw-w-full tw-h-full tw-object-cover group-hover:tw-scale-110 tw-transition"
          />
          <div className="tw-absolute tw-top-3 tw-right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="tw-font-semibold tw-text-lg">
          {location?.region},{location?.label}
        </div>
        <div className="tw-font-light tw-text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className=" tw-flex tw-flex-row tw-items-center tw-gap-1">
          <div className="tw-font-semibold">$ {price}</div>
          {!reservation && <div className="tw-font-light">/night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
