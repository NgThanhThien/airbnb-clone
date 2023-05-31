'use client';
import React, { useCallback, useState } from 'react';
import { SafeReservation, SafeUser } from '../types';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import ListingCard from '@/components/listings/ListingCard';

interface TripClientProps {
  reservations: SafeReservation[];
  currentUser: SafeUser | null;
}
const TripClient: React.FC<TripClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation cancelled');
          router.refresh();
        })
        .catch((error) => toast.error(error?.response?.data?.error))
        .finally(() => setDeletingId(''));
    },
    [router]
  );
  return (
    <Container>
      <Heading title="Trips" subtitle="Where you've been where you're going" />
      <div className="tw-mt-10 tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 xl:tw-grid-cols-5 2xl:tw-grid-cols-6 tw-gap-8">
        {reservations?.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            onAction={onCancel}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripClient;
