'use client';
import React, { useMemo, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import Modal from './Modal';
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';

import useRentModal from '@/hooks/useRentModal';
import CountrySelect from '../inputs/CountrySelect';

enum STEP {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}
const RentModal = () => {
  const rentModal = useRentModal();

  const [step, setStep] = useState<number>(STEP.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  });
  const category = watch('category');
  const location = watch('location');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEP.PRICE) {
      return 'Create';
    }
    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEP.CATEGORY) return undefined;
    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="tw-flex tw-flex-col tw-gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-3 tw-max-h-[50vh] tw-overflow-y-auto">
        {categories.map((item) => {
          return (
            <div key={item.label} className="tw-col-span-1">
              <CategoryInput
                onClick={(category) => setCustomValue('category', category)}
                selected={item.label === category}
                label={item.label}
                icon={item.icon}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
  if (step === STEP.LOCATION) {
    bodyContent = (
      <div className="tw-flex tw-flex-col tw-gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      title="Airbnb your home!"
      onClose={rentModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEP.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default RentModal;
