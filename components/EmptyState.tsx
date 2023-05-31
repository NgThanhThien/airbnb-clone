'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import Heading from './Heading';
import Button from './Button';
interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}
const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No exact matches',
  subtitle = 'Try changing or removing some of your filters.',
  showReset,
}) => {
  const router = useRouter();
  return (
    <div className="tw-h-[60vh] tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-2">
      <Heading title={title} subtitle={subtitle} center />
      <div className="tw-w-48 tw-mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
