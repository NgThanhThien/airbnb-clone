'use client';

import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '../Button';
interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: ReactElement;
  footer?: ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}
const Modal: React.FC<ModalProps> = (props) => {
  const {
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel,
  } = props;

  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;
  return (
    <>
      <div className="tw-justify-center tw-items-center tw-flex tw-overflow-x-hidden tw-overflow-y-auto tw-fixed tw-inset-0 tw-z-50 tw-outline-none focus:tw-outline-none tw-bg-neutral-800/70">
        <div className="tw-relative tw-w-full md:tw-w-4/6 lg:tw-w-3/6 xl:tw-w-2/5 tw-my-6 tw-mx-auto tw-h-full lg:tw-h-auto md:tw-h-auto">
          <div
            className={`
              tw-translate tw-duration-300 tw-h-full 
              ${showModal ? 'tw-translate-y-0' : 'tw-translate-y-full'} 
              ${showModal ? 'tw-opacity-100' : 'tw-opacity-0'}
            `}
          >
            <div
              className="
                tw-translate
                tw-h-full
                lg:tw-h-auto
                md:tw-h-auto
                tw-border-0
                tw-rounded-lg
                tw-shadow-lg
                tw-relative
                tw-flex
                tw-flex-col
                tw-w-full
                tw-bg-white
                tw-outline-none
                focus:tw-outline-none
              "
            >
              {/* Header */}
              <div
                className="
                  tw-flex
                  tw-items-center
                  tw-p-6
                  tw-rounded-t
                  tw-justify-center
                  tw-relative
                  tw-border-b-[1px]
                "
              >
                <button
                  onClick={handleClose}
                  className="
                    tw-p-2
                    tw-border-0
                    hover:tw-bg-gray-100
                    tw-rounded-full
                    tw-transition
                    tw-absolute
                    tw-left-7
                  "
                >
                  <IoMdClose size={18} />
                </button>
                <div className="tw-text-lg tw-font-semibold">{title}</div>
              </div>
              {/* Body */}
              <div className="tw-relative tw-p-6 tw-flex-auto">{body}</div>
              {/* footer */}
              <div className="tw-flex tw-flex-col tw-gap-2 tw-p-6">
                <div
                  className="
                    tw-flex
                    tw-flex-row
                    tw-items-center
                    tw-gap-4
                    tw-w-full
                  "
                >
                  {secondaryActionLabel && secondaryAction && (
                    <Button
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                      outline
                    />
                  )}

                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
