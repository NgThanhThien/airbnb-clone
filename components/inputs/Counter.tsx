import React, { useCallback } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
interface CounterProps {
  title: string;
  subtitle: string;
  onChange: (value: number) => void;
  value: number;
}
const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  onChange,
  value,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) return;
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="tw-flex tw-flex-row tw-items-center tw-justify-between">
      <div className="tw-flex tw-flex-col">
        <div className="tw-font-medium">{title}</div>
        <div className="tw-font-light tw-text-gray-600">{subtitle}</div>
      </div>
      <div className="tw-flex tw-flex-row tw-items-center tw-gap-4">
        <div
          onClick={onReduce}
          className="tw-w-10 tw-h-10 tw-rounded-full tw-border tw-border-neutral-400 tw-flex tw-justify-center tw-items-center tw-text-neutral-600 tw-cursor-pointer hover:tw-opacity-80 tw-transition"
        >
          <AiOutlineMinus />
        </div>
        <div className="tw-font-light tw-text-neutral-600 tw-text-xl tw-w-10 tw-text-center">
          {value}
        </div>
        <div
          onClick={onAdd}
          className="tw-w-10 tw-h-10 tw-rounded-full tw-border tw-border-neutral-400 tw-flex tw-justify-center tw-items-center tw-text-neutral-600 tw-cursor-pointer hover:tw-opacity-80 tw-transition"
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
