import { CldUploadWidget } from 'next-cloudinary';
import React, { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';
import Image from 'next/image';
declare global {
  var cloudinary: any;
}

interface UploadImageProps {
  onChange: (value: string) => void;
  imgSrc: string;
}
const uploadPreset = 'y4thydmr';

const UploadImage: React.FC<UploadImageProps> = ({ onChange, imgSrc }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="tw-relative tw-cursor-pointer hover:opacity-70 tw-transition tw-border-dashed tw-border-2 tw-p-20 tw-border-neutral-300 tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-4 tw-text-neutral-600"
          >
            <TbPhotoPlus size={50} />
            <div className="tw-font-semibold tw-text-lg">Click to upload</div>
            {imgSrc && (
              <div className="tw-absolute tw-inset-0 tw-w-full tw-h-full">
                <Image
                  fill
                  style={{ objectFit: 'cover' }}
                  src={imgSrc}
                  alt="house"
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default UploadImage;
