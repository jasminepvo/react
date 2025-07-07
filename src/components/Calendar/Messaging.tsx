import React, { FC } from 'react';
import { CompoundComponentProps } from './types';

export const Messaging: FC<CompoundComponentProps> = ({
  className,
  children,
}) => (
  <div className={className} role='status'>
    {children}
  </div>
);
