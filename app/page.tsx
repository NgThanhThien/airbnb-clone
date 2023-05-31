import Image from 'next/image';
import getListings, { IListingsParams } from './actions/getListings';
import getCurrentUser from './actions/getCurrentUser';
import ClientOnly from '@/components/ClientOnly';
import EmptyState from '@/components/EmptyState';
import Container from '@/components/Container';
import ListingCard from '@/components/listings/ListingCard';

interface HomeProps {
  searchParams: IListingsParams;
}
const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0)
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );

  return (
    <main>
      <ClientOnly>
        <Container>
          <div className="tw-pt-24 tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 xl:tw-grid-cols-5 2xl:tw-grid-cols-6 tw-gap-8">
            {listings.map((listing: any) => (
              <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            ))}
          </div>
        </Container>
      </ClientOnly>
    </main>
  );
};
export default Home;
