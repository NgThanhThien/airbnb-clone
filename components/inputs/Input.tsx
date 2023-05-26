import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

interface InputProps {
  id: string;
  label?: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}
const Input: React.FC<InputProps> = (props) => {
  const {
    id,
    label,
    type = 'text',
    disabled,
    formatPrice,
    register,
    required,
    errors,
  } = props;
  return (
    <div className="tw-w-full tw-relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="tw-text-neutral-700 tw-absolute tw-top-5 tw-left-2"
        />
      )}
      <input
        id={id}
        type={type}
        disabled={disabled}
        placeholder=" "
        {...register(id, { required })}
        className={`
          tw-peer
          tw-w-full
          tw-p-4
          tw-pt-6
          tw-font-light
          tw-bg-white
          tw-border-2
          tw-rounded-md
          tw-outline-none
          tw-transition
          disabled:tw-opacity-70
          disabled:tw-cursor-not-allowed
          ${formatPrice ? 'tw-pl-9' : 'tw-pl-4'}
          ${errors[id] ? 'tw-border-rose-500' : 'tw-border-neutral-300'}
          ${errors[id] ? 'focus:tw-border-rose-500' : 'focus:tw-border-black'}
        `}
      />
      <label
        className={`
          tw-absolute
          tw-text-md
          tw-duration-150
          tw-transform
          tw--translate-y-3
          tw-top-6
          tw-z-10
          tw-origin-[0]
          ${formatPrice ? 'tw-left-9' : 'tw-left-4'}
          peer-placeholder-shown:tw-scale-100
          peer-placeholder-shown:tw-translate-y-0
          peer-focus:tw-scale-75
          peer-focus:tw--translate-y-4
          ${errors[id] ? 'tw-text-rose-500' : 'tw-text-zinc-400'}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
