import Navbar from '@/components/navbar/Navbar';
import './globals.css';
import { Nunito } from 'next/font/google';
import ClientOnly from '@/components/ClientOnly';
import RegisterModal from '@/components/modals/RegisterModal';
import ToasterProvider from '@/providers/ToasterProvider';
import LoginModal from '@/components/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';
import Categories from '@/components/navbar/Categories';
import RentModal from '@/components/modals/RentModal';
const font = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb - clone',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
          <Categories />
          <ToasterProvider />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
