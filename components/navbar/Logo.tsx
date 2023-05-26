'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const Logo = () => {
  const router = useRouter();
  return (
    <div>
      <Image
        onClick={() => router.push('/')}
        src="/images/logo.png"
        alt="logo"
        width={118}
        height={64}
      />
    </div>
  );
};

export default Logo;
