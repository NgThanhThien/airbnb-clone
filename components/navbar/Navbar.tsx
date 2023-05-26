import { SafeUser } from '@/app/types';
import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';

interface NavbarProps {
  currentUser: SafeUser | null;
}
const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <nav className="tw-py-4 tw-border-b-[1px]">
      <Container>
        <div className="tw-flex tw-flex-row tw-justify-between tw-items-center tw-gap-3 md:tw-gap-0">
          <Logo />
          <Search />
          <UserMenu currentUser={currentUser} />
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
