'use client';
import React, { useCallback, useState } from 'react';
import { AiOutlineGlobal, AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';

import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';
import useRentModal from '@/hooks/useRentModal';

import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
  currentUser: SafeUser | null;
}
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const onRent = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="tw-relative tw-z-10">
      <div className="tw-flex tw-flex-row tw-items-center">
        <div
          className="tw-p-3 tw-rounded-full hover:tw-bg-gray-100 tw-cursor-pointer tw-transition"
          onClick={onRent}
        >
          Airbnb your home
        </div>
        <div className="tw-p-3 tw-rounded-full hover:tw-bg-gray-100 tw-cursor-pointer tw-transition">
          <AiOutlineGlobal size={18} />
        </div>
        <div
          className="tw-flex tw-flex-row tw-gap-2 tw-items-center tw-border tw-pl-[12px] tw-pr-[5px] tw-rounded-full tw-py-[5px] hover:tw-shadow tw-transition tw-ml-3 tw-cursor-pointer"
          onClick={toggleOpen}
        >
          <AiOutlineMenu size={18} />
          <Avatar src={currentUser?.image as string} />
        </div>
      </div>
      {isOpen && (
        <div
          className={`tw-absolute tw-right-0 tw-shadow-md tw-top-13 tw-w-[250px] tw-rounded-xl tw-bg-white tw-divide-y-[1px]`}
        >
          <div className="tw-py-2">
            {currentUser ? (
              <>
                <MenuItem
                  label="My trips"
                  onClick={() => {
                    setIsOpen(false);
                    router.push('/trips');
                  }}
                />
                <MenuItem
                  label="My favorites"
                  onClick={() => {
                    setIsOpen(false);
                    router.push('/favorites');
                  }}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => {
                    setIsOpen(false);
                    router.push('/reservations');
                  }}
                />
                <MenuItem
                  label="My properties"
                  onClick={() => {
                    setIsOpen(false);
                    router.push('/properties');
                  }}
                />
                <MenuItem label="My profile" onClick={() => {}} />
              </>
            ) : (
              <>
                <MenuItem
                  className="tw-font-semibold"
                  label="Sign up"
                  onClick={() => {
                    toggleOpen();
                    registerModal.onOpen();
                  }}
                />
                <MenuItem
                  label="Login"
                  onClick={() => {
                    toggleOpen();
                    loginModal.onOpen();
                  }}
                />
              </>
            )}
          </div>

          <div className="tw-py-2">
            <MenuItem label="Airbnb your home" onClick={rentModal.onOpen} />
            <MenuItem label="Help" onClick={() => {}} />
            {currentUser && (
              <MenuItem label="Logout" onClick={() => signOut()} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
