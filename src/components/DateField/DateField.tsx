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
import { formatDate } from '../DatePicker/helper';

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

/**
 * DateField is a modular and accessible date input component that provides a comprehensive
 * solution for date selection with a popover calendar interface.
 *
 * Features:
 * - Controlled & Uncontrolled modes
 * - Accessible with ARIA attributes and keyboard navigation
 * - Composable using compound component pattern
 * - Built-in date validation with custom error messages
 * - Extensive styling and behavior customization options
 * - Full TypeScript support
 *
 * Basic Usage:
 * ```tsx
 * <DateField value={date} onDateChange={setDate}>
 *   <DateField.Label>Select Date</DateField.Label>
 *   <DateField.Input placeholder="Choose a date">
 *   <DateField.Popover>
 *     <DateField.Trigger />
 *     <DateField.PopoverPanel>
 *       <DateField.Calendar>
 *         <Calendar.Heading>
 *           <Calendar.Navigation direction="prev" />
 *           <Calendar.MonthSelect />
 *           <Calendar.YearSelect />
 *           <Calendar.Navigation direction="next" />
 *         </Calendar.Heading>
 *         <Calendar.Grid>
 *           <Calendar.GridHeader />
 *           <Calendar.GridBody />
 *         </Calendar.Grid>
 *         <Calendar.ActionItemButton>Submit</Calendar.ActionItemButton>
 *       </DateField.Calendar>
 *     </DateField.PopoverPanel>
 *   </DateField.Popover>
 * </DateField.Input>
 * </DateField>
 * ```
 *
 * Compound Components:
 * - DateField.Label: Renders the field label
 * - DateField.Input: Main input field for date entry
 * - DateField.Trigger: Calendar icon button
 * - DateField.Popover: Popover container
 * - DateField.PopoverPanel: Panel containing the calendar
 * - DateField.Calendar: Calendar wrapper with DateField behavior
 * - DateField.HelpText: Help text display
 * - DateField.Error: Validation error display
 *
 * @param props - DateField component props
 * @returns DateField component with compound components
 * @example
 * <DateField value={date} onDateChange={setDate}>
 *   <DateField.Label>Select Date</DateField.Label>
 *   <DateField.Input placeholder="Choose a date">
 *   <DateField.Popover>
 *     <DateField.Trigger />
 *     <DateField.PopoverPanel>
 *       <DateField.Calendar>
 *         <Calendar.Heading>
 *           <Calendar.Navigation direction="prev" />
 *           <Calendar.MonthSelect />
 *           <Calendar.YearSelect />
 *           <Calendar.Navigation direction="next" />
 *         </Calendar.Heading>
 *         <Calendar.Grid>
 *           <Calendar.GridHeader />
 *           <Calendar.GridBody />
 *         </Calendar.Grid>
 *       </DateField.Calendar>
 *     </DateField.PopoverPanel>
 *   </DateField.Popover>
 *   </DateField.Input>
 * </DateField>
 * @params {string} [className] - Optional class name for styling
 * @params {React.CSSProperties} [style] - Optional inline styles
 * @params {React.ReactNode} [children] - Child elements to render
 * @params {boolean} [disabled] - Whether the input is disabled
 * @params {string} [label] - The label for the input
 * @params {boolean} [required] - Whether the input is required
 * @params {Date} [minDate] - The minimum date that can be selected
 * @params {Date} [maxDate] - The maximum date that can be selected
 * @params {Date[]} [excludeDates] - Dates to exclude from selection
 * @params {string} [startDateErrorMessage] - Error message for start date
 * @params {string} [endDateErrorMessage] - Error message for end date
 * @params {string} [excludeDatesErrorMessage] - Error message for excluded dates
 * @params {Date} [value] - The value of the input
 * @params {function} [onDateChange] - Function to call when the date changes
 * @params {function} [onSubmit] - Function to call when the form is submitted
 * @params {function} [onClose] - Function to call when the popover is closed
 * @params {function} [onOpen] - Function to call when the popover is opened
 * @params {function} [onError] - Function to call when the input is in an error state
 * @params {function} [onFocus] - Function to call when the input is focused
 */

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
  format = 'MM/dd/yyyy',
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedDate = isControlled ? value : internalValue;
  const [inputValue, setInputValue] = useState<string>(
    selectedDate ? formatDate(selectedDate, format) : ''
  );
  const [inputError, setInputError] = useState<string>('');

  /**
   * Sets the date value and updates related state.
   * Handles both controlled and uncontrolled modes.
   */
  const setValue = useCallback(
    (date: Date | undefined) => {
      if (!isControlled) setInternalValue(date);
      onDateChange?.(date);
      setInputValue(date ? formatDate(date, format) : '');
    },
    [isControlled, onDateChange, format]
  );

  /**
   * Context value provided to all child components.
   * Contains all state and setters needed by compound components.
   */
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
      format,
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
      format,
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
