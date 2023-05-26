import React from 'react';
import { BiSearch } from 'react-icons/bi';
const Search = () => {
  return (
    <div className="tw-flex tw-flex-row tw-items-center tw-border tw-rounded-full tw-transition tw-shadow hover:tw-shadow-md tw-px-2 tw-cursor-pointer tw-h-12">
      <div className="tw-px-4 tw-font-semibold tw-border-r">Anywhere</div>
      <div className="tw-px-4 tw-font-semibold tw-border-r">Any week</div>
      <div className="tw-px-4">Add guests</div>
      <div className="tw-p-2 tw-rounded-full tw-bg-rose-500 tw-text-white">
        <BiSearch size={18} />
      </div>
    </div>
  );
};

export default Search;
