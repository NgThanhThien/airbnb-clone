import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}
const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="tw-max-w-[2520px] tw-mx-auto xl:tw-px-20 md:tw-px-10 sm:tw-px-2 tw-px-4">
      {children}
    </div>
  );
};
export default Container;
