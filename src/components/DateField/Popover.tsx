import React, { ReactNode } from 'react';
import { useDateFieldContext } from './DateFieldContext';
import * as PopoverPrimitive from '@radix-ui/react-popover';

/**
 * @description Popover component for DateField
 * @param {PopoverProps} props - The props for the Popover component
 * @param {React.ReactNode} props.children - The children of the Popover component
 * @returns {React.ReactNode} The Popover component
 */

const Popover: React.FC<{ children: ReactNode }> = ({ children }) => {
  const ctx = useDateFieldContext();
  return (
    <PopoverPrimitive.Root open={ctx.open} onOpenChange={ctx.setOpen}>
      {children}
    </PopoverPrimitive.Root>
  );
};

export default Popover;
