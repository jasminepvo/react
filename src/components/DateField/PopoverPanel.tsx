import React, { ReactNode, useCallback } from 'react';
import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { useDateFieldContext } from './DateFieldContext';

interface PopoverPanelProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const PopoverPanel: React.FC<PopoverPanelProps> = ({
  children,
  className,
  style,
  ...props
}) => {
  const ctx = useDateFieldContext();

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        ctx.setOpen(false);
      }
    },
    [ctx]
  );

  return (
    <Popover.Portal>
      <Popover.Content
        {...props}
        className={clsx(
          'z-50 bg-white rounded-lg shadow-lg p-4 mt-2',
          className
        )}
        style={style}
        onKeyDown={handleKeyDown}
        onEscapeKeyDown={() => ctx.setOpen(false)}
        onInteractOutside={() => ctx.setOpen(false)}
      >
        {children}
      </Popover.Content>
    </Popover.Portal>
  );
};

export default PopoverPanel;
