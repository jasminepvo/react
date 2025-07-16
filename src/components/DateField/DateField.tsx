import React, { useState, useRef } from 'react';
import { DateFieldContext } from './DateFieldContext';
import type { DateFieldProps } from './types';
import Label from './Label';
import HelpText from './HelpText';
import Error from './Error';
import Input from './Input';
import Trigger from './Trigger';
import Popover from './Popover';
import PopoverPanel from './PopoverPanel';
import CalendarSlot from './CalendarSlot';

const DateFieldBase: React.FC<DateFieldProps> = ({
  value,
  onChange,
  className = '',
  style,
  children,
  disabled = false,
  label,
  required = false,
  helpText,
  minDate = new Date(0),
  maxDate = new Date(8640000000000000),
  excludeDates = [],
  startDateErrorMessage,
  endDateErrorMessage,
  excludeDatesErrorMessage,
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedDate = isControlled ? value : internalValue;
  const [inputValue, setInputValue] = useState<string>(
    selectedDate ? selectedDate.toLocaleDateString() : ''
  );
  const [inputError, setInputError] = useState<string>('');

  const setValue = (date: Date | undefined) => {
    if (!isControlled) setInternalValue(date);
    onChange?.(date);
    setInputValue(date ? date.toLocaleDateString() : '');
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
        inputValue,
        setInputValue,
        inputError,
        setInputError,
        required,
        label,
        helpText,
        minDate,
        maxDate,
        excludeDates,
        startDateErrorMessage,
        endDateErrorMessage,
        excludeDatesErrorMessage,
      }}
    >
      <div className={`relative inline-block ${className}`} style={style}>
        {children}
      </div>
    </DateFieldContext.Provider>
  );
};

export const DateField = Object.assign(DateFieldBase, {
  Input,
  Trigger,
  Popover,
  PopoverPanel,
  Calendar: CalendarSlot,
  Label,
  HelpText,
  Error,
});

export default DateField;
