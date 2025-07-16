import React, { ReactNode } from 'react';
import * as Popover from '@radix-ui/react-popover';

const PopoverPanel: React.FC<{
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className = '', style }) => {
  return (
    <Popover.Portal>
      <Popover.Content
        className={`z-50 bg-white rounded-lg shadow-lg p-4 mt-2 ${className}`}
        style={style}
      >
        {children}
      </Popover.Content>
    </Popover.Portal>
  );
};

export default PopoverPanel;
