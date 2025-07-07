import React, { FC } from 'react';
import { CompoundComponentProps } from './types';

export const Heading: FC<CompoundComponentProps> = ({
  className,
  children,
}) => <div className={className}>{children}</div>;
