import React, { useState, useRef, useMemo, useCallback } from 'react';
import { DateFieldContext } from './DateFieldContext';
import type { DateFieldBaseProps } from './types';
import Label from './Label';
import HelpText from './HelpText';
import Error from './Error';
import Input from './Input';
import Trigger from './Trigger';
import Popover from './Popover';
import PopoverPanel from './PopoverPanel';
import CalendarSlot from './CalendarSlot';

interface DateFieldCompoundComponent extends React.FC<DateFieldBaseProps> {
  Input: typeof Input;
  Trigger: typeof Trigger;
  Popover: typeof Popover;
  PopoverPanel: typeof PopoverPanel;
  Calendar: typeof CalendarSlot;
  Label: typeof Label;
  HelpText: typeof HelpText;
  Error: typeof Error;
}

const DateField: DateFieldCompoundComponent = ({
  value,
  onDateChange,
  className = '',
  style,
  children,
  disabled = false,
  label,
  required = false,
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

  const setValue = useCallback(
    (date: Date | undefined) => {
      if (!isControlled) setInternalValue(date);
      onDateChange?.(date);
      setInputValue(date ? date.toLocaleDateString() : '');
    },
    [isControlled, onDateChange]
  );

  const contextValue = useMemo(
    () => ({
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
      minDate,
      maxDate,
      excludeDates,
      startDateErrorMessage,
      endDateErrorMessage,
      excludeDatesErrorMessage,
    }),
    [
      selectedDate,
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
      minDate,
      maxDate,
      excludeDates,
      startDateErrorMessage,
      endDateErrorMessage,
      excludeDatesErrorMessage,
    ]
  );

  return (
    <DateFieldContext.Provider value={contextValue}>
      <div className={`relative inline-block ${className}`} style={style}>
        {children}
      </div>
    </DateFieldContext.Provider>
  );
};

DateField.Input = Input;
DateField.Trigger = Trigger;
DateField.Popover = Popover;
DateField.PopoverPanel = PopoverPanel;
DateField.Calendar = CalendarSlot;
DateField.Label = Label;
DateField.HelpText = HelpText;
DateField.Error = Error;

export default DateField;
