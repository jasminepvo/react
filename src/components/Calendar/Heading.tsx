import { FC } from 'react';
import { BaseProps } from './types';

export const Heading: FC<BaseProps> = ({
  className,
  children,
}) => <div className={className}>{children}</div>;
