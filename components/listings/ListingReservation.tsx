'use client';
import React from 'react';
import { Range } from 'react-date-range';
import Calendar from '@/components/inputs/Calendar';
import Button from '../Button';

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  dateRange: Range;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}
const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  dateRange,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <div className="tw-bg-white tw-rounded-xl tw-border tw-border-neutral-200 tw-overflow-hidden">
      <div className="tw-flex tw-flex-row tw-items-center tw-gap-1 tw-p-4">
        <div className="tw-text-2xl tw-font-semibold">${price}</div>
        <div className="tw-text-neutral-600 tw-font-light">night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="tw-p-4">
        <Button disabled={disabled} onClick={onSubmit} label="Reserve" />
      </div>
      <div className="tw-p-4 tw-flex tw-flex-row tw-items-center tw-justify-between tw-font-semibold tw-text-lg">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
