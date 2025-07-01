import React, { FC } from 'react';
import { HeadingProps } from './types';
import clsx from 'clsx';

export const Heading: FC<HeadingProps> = ({ children, className }) => {
  return (
    <div className={clsx('flex items-center justify-between p-4', className)}>
      {children}
    </div>
  );
};
