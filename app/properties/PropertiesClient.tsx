'use client';
import React, { useCallback, useState } from 'react';
import { SafeListing, SafeUser } from '../types';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import ListingCard from '@/components/listings/ListingCard';

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser: SafeUser | null;
}
const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success('Listing deleted successfully');
          router.refresh();
        })
        .catch((error) => toast.error(error?.response?.data?.error))
        .finally(() => setDeletingId(''));
    },
    [router]
  );
  return (
    <Container>
      <Heading title="Properties" subtitle="Listing of your properties" />
      <div className="tw-mt-10 tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 xl:tw-grid-cols-5 2xl:tw-grid-cols-6 tw-gap-8">
        {listings?.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete Property"
            actionId={listing.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
