import { FC, HTMLAttributes } from 'react';
import { BaseProps } from './types';
import clsx from 'clsx';

export const Messaging: FC<BaseProps & HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={clsx('text-left', className)} {...props}>
    {children}
  </div>
);
