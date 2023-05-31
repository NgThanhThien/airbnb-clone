'use client';
import React from 'react';
import { SafeUser } from '@/app/types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import useFavorite from '@/hooks/useFavorite';

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}
const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="tw-relative hover:tw-opacity-80 tw-transition tw-cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="tw-fill-white tw-absolute tw--top-[2px] tw--right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? 'tw-fill-rose-500' : 'tw-fill-neutral-500/70'}
      />
    </div>
  );
};

export default HeartButton;
