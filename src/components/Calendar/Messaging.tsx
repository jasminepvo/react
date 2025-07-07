import { FC } from 'react';
import { MessagingProps } from './types';
import clsx from 'clsx';

export const Messaging: FC<MessagingProps> = ({ children, className }) => {
  return (
    <div className={clsx('text-center mt-4 text-sm text-gray-600', className)}>
      {children}
    </div>
  );
};
