import React, {
  useState,
  useRef,
  createContext,
  useContext,
  ReactNode,
} from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Calendar } from '../Calendar';
import type { CalendarProps } from '../Calendar';

interface DateFieldContextProps {
  value?: Date;
  setValue: (date: Date | undefined) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  disabled?: boolean;
}

const DateFieldContext = createContext<DateFieldContextProps | undefined>(
  undefined
);

export interface DateFieldProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
  disabled?: boolean;
}

const DateFieldBase: React.FC<DateFieldProps> = ({
  value,
  onChange,
  className = '',
  style,
  children,
  disabled = false,
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedDate = isControlled ? value : internalValue;

  const setValue = (date: Date | undefined) => {
    if (!isControlled) setInternalValue(date);
    onChange?.(date);
  };

  return (
    <DateFieldContext.Provider
      value={{
        value: selectedDate,
        setValue,
        open,
        setOpen,
        inputRef,
        disabled,
      }}
    >
      <div className={`relative inline-block ${className}`} style={style}>
        {children}
      </div>
    </DateFieldContext.Provider>
  );
};

const Input: React.FC<{
  placeholder?: string;
  name?: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}> = ({ placeholder = 'Select date', name, id, className = '', style }) => {
  const ctx = useContext(DateFieldContext);
  if (!ctx) throw new Error('DateField.Input must be used within DateField');
  return (
    <input
      ref={ctx.inputRef}
      type='text'
      className={`w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-400 ${className}`}
      value={ctx.value ? ctx.value.toLocaleDateString() : ''}
      onChange={() => {}}
      placeholder={placeholder}
      disabled={ctx.disabled}
      name={name}
      id={id}
      readOnly
      style={style}
    />
  );
};

const Trigger: React.FC<{
  className?: string;
  style?: React.CSSProperties;
}> = ({ className = '', style }) => {
  const ctx = useContext(DateFieldContext);
  if (!ctx) throw new Error('DateField.Trigger must be used within DateField');
  return (
    <Popover.Trigger asChild>
      <button
        type='button'
        className={`absolute right-2 top-1/2 -translate-y-1/2 text-pink-500 hover:text-pink-700 focus:outline-none ${className}`}
        aria-label='Open calendar'
        disabled={ctx.disabled}
        tabIndex={-1}
        style={style}
      >
        <svg width='20' height='20' fill='currentColor' viewBox='0 0 20 20'>
          <path d='M6 2a1 1 0 0 1 1 1v1h6V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V3a1 1 0 0 1 1-1zm8 4V6H6v.01H4v10h12V6h-2z' />
        </svg>
      </button>
    </Popover.Trigger>
  );
};

const PopoverContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  const ctx = useContext(DateFieldContext);
  if (!ctx) throw new Error('DateField.Popover must be used within DateField');
  return (
    <Popover.Root open={ctx.open} onOpenChange={ctx.setOpen}>
      {children}
    </Popover.Root>
  );
};

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

const CalendarSlot: React.FC<
  Omit<CalendarProps, 'selectedDate' | 'onSelectDate'>
> = ({ children, ...rest }) => {
  const ctx = useContext(DateFieldContext);
  if (!ctx) throw new Error('DateField.Calendar must be used within DateField');
  const [tempDate, setTempDate] = React.useState<Date | undefined>(ctx.value);

  // Reset tempDate when popover opens or value changes
  React.useEffect(() => {
    if (ctx.open) setTempDate(ctx.value);
  }, [ctx.open, ctx.value]);

  // Handler for calendar date selection
  const handleSelect = (date: Date | undefined) => {
    setTempDate(date);
  };

  // Handler for submit button
  const handleSubmit = () => {
    ctx.setValue(tempDate);
    ctx.setOpen(false);
  };

  return (
    <Calendar selectedDate={tempDate} onSelectDate={handleSelect} {...rest}>
      {children}
      <Calendar.ActionItemButton variant='button' onClick={handleSubmit}>
        Submit
      </Calendar.ActionItemButton>
    </Calendar>
  );
};

export const DateField = Object.assign(DateFieldBase, {
  Input,
  Trigger,
  Popover: PopoverContent,
  PopoverPanel,
  Calendar: CalendarSlot,
});

export default DateField;
