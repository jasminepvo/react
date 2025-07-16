import React, { ReactNode } from 'react';
import { useDateFieldContext } from './DateFieldContext';
import * as PopoverPrimitive from '@radix-ui/react-popover';

const Popover: React.FC<{ children: ReactNode }> = ({ children }) => {
  const ctx = useDateFieldContext();
  return (
    <PopoverPrimitive.Root open={ctx.open} onOpenChange={ctx.setOpen}>
      {children}
    </PopoverPrimitive.Root>
  );
};

export default Popover;
