import React from 'react';
import Image from 'next/image';

interface ImageProps {
  src?: string | null;
}

const Avatar: React.FC<ImageProps> = ({ src }) => {
  return (
    <div>
      <Image
        src={src || '/images/placeholder.jpg'}
        alt="user"
        width={30}
        height={30}
        className="tw-rounded-full"
      />
    </div>
  );
};

export default Avatar;
