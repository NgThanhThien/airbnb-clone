'use client';

import useCountries from '@/hooks/useCountries';
import React from 'react';
import Select from 'react-select';

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}
const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="tw-flex tw-flex-row tw-items-center tw-gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label}
              <span className="tw-text-neutral-500 tw-ml-1">
                {option.region}
              </span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'tw-p-3 tw-border-2',
          input: () => 'tw-text-lg',
          option: () => 'tw-text-lg',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          color: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6',
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
