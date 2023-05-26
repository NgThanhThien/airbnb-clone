'use client';
import React from 'react';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}
const Heading: React.FC<HeadingProps> = ({ title, center, subtitle }) => {
  return (
    <div className={`${center ? 'tw-text-center' : 'tw-text-start'}`}>
      <div className="tw-text-2xl tw-font-bold">{title}</div>
      {subtitle && (
        <div className="tw-font-light tw-text-neutral-500 tw-mt-2">
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default Heading;
