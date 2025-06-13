import { useRef, useState } from 'react';
import type { JSX } from 'react';
import { format, parse, isValid } from 'date-fns';
import * as Popover from '@radix-ui/react-popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Calendar } from './Calender';
import {
  validateDateInput,
  validDateFormat,
  getInitialInputError,
  formatDateInput,
  getRequiredFieldError,
} from './helper';
import { DatePickerProps, SelectionValue } from './types';
import clsx from 'clsx';

/**
 * DatePicker component allows for controlled or uncontrolled date selection.
 * It also allows for the selection of a payment due date.
 *
 * @param {DatePickerProps} props - The props for the DatePicker component.
 * @returns {JSX.Element} The DatePicker component.
 *
 * [Storybook](todo: add link)
 */

const DatePicker = ({
  className = '',
  startDate,
  endDate,
  excludeDates = [],
  isReadOnly = false,
  required = false,
  selected,
  onChange,
  placeholder = '',
  helpText,
  idTextfield,
  name,
  startDateErrorMessage,
  endDateErrorMessage,
  excludeDatesErrorMessage,
  error,
  label,
  disclaimer,
  disabled,
  paymentDueDate,
  showOutsideDays = true,
  captionLayout = 'dropdown',
  numberOfMonths = 2,
}: DatePickerProps): JSX.Element => {
  // The currently selected date (uncontrolled mode)
  const [selectedDate, setSelectedDate] = useState<SelectionValue>(null);

  // Controls whether the calendar popover is open
  const [open, setOpen] = useState(false);

  // Temporarily holds the date selected in the calendar before confirmation
  const [tempSelectedDate, setTempSelectedDate] = useState<Date | undefined>(
    undefined
  );

  // The string value shown in the input field
  const [inputValue, setInputValue] = useState<string>(() => {
    const date = selected || selectedDate;
    return date ? format(date, 'MM/dd/yyyy') : '';
  });

  // The current error message for the input field
  const [inputError, setInputError] = useState(() =>
    getInitialInputError({
      required,
      selected,
      selectedDate,
      error,
    })
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = selected !== undefined;
  const selectedDateFinal = isControlled ? selected : selectedDate;

  // Handles date selection from the calendar popover
  const handleCalendarSelect = (date: Date | undefined) => {
    setTempSelectedDate(date);
    setInputError(''); // Clear any previous errors

    if (date) {
      const validationError = validateDateInput({
        minDate: startDate || new Date(0),
        maxDate: endDate || new Date(8640000000000000),
        formattedDate: format(date, 'MM/dd/yyyy'),
        excludeDates,
        startDateErrorMessage,
        endDateErrorMessage,
        excludeDatesErrorMessage,
      });

      if (validationError) {
        setInputError(validationError);
        return;
      }
      setTempSelectedDate(date);
    }
  };

  // Handles confirming the selected date from the calendar
  const handleConfirmDate = () => {
    const confirmedDate = tempSelectedDate ?? null;

    if (!isControlled) {
      setSelectedDate(confirmedDate);
    }
    onChange?.(confirmedDate);

    setInputValue(confirmedDate ? format(confirmedDate, 'MM/dd/yyyy') : '');
    // Use helper to get required field error message
    setInputError(getRequiredFieldError(confirmedDate, required, error));
    setOpen(false);
  };

  // Handles user input in the text field, including formatting and validation
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isReadOnly) return;

    let input = e.target.value;
    setInputError(''); // Clear any previous errors

    // Use helper to format input as MM/DD/YYYY
    input = formatDateInput(input);

    // Prevent more than 10 characters (MM/DD/YYYY)
    if (input.length <= 10) {
      setInputValue(input);

      // Try to parse the date if we have enough characters
      if (input.length === 10 && validDateFormat(input)) {
        const parsedDate = parse(input, 'MM/dd/yyyy', new Date());
        if (isValid(parsedDate)) {
          const validationError = validateDateInput({
            minDate: startDate || new Date(0),
            maxDate: endDate || new Date(8640000000000000),
            formattedDate: input,
            excludeDates,
            startDateErrorMessage,
            endDateErrorMessage,
            excludeDatesErrorMessage,
          });

          if (validationError) {
            setInputError(validationError);
          } else {
            if (!isControlled) {
              setSelectedDate(parsedDate);
            }
            onChange?.(parsedDate);
            // Use helper to get required field error message
            setInputError(getRequiredFieldError(parsedDate, required, error));
          }
        } else {
          // Set a custom error message for invalid dates
          setInputError('Please enter a valid date (MM/DD/YYYY).');
        }
      }
    }
  };

  return (
    <div className='text-left'>
      <div
        className={clsx(
          'rounded-lg border border-gray bg-cream px-2 py-1 text-lg focus:outline-none',
          inputError && 'border-red-600',
          className
        )}
      >
        <label
          htmlFor={idTextfield || 'date-input'}
          className={clsx(
            'block text-xs font-normal text-taupe',
            inputError && 'text-red-600'
          )}
        >
          {label}
          {required && <span className='text-red-600 ml-1'>*</span>}
        </label>

        <div className='relative'>
          <input
            type='text'
            id={idTextfield || 'date-input'}
            name={name}
            className='w-full bg-transparent focus:outline-none text-brown'
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            ref={inputRef}
            required={required}
            readOnly={isReadOnly}
          />

          <Popover.Root
            open={open && !isReadOnly}
            onOpenChange={(isOpen) => {
              setOpen(isOpen);
            }}
          >
            <Popover.Trigger asChild>
              <button
                className='absolute -top-1/4 right-3'
                type='button'
                aria-label='Open calendar'
                disabled={isReadOnly}
              >
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className={clsx(
                    'h-[20px] w-[17.5px] text-blush',
                    inputError && 'text-red-600'
                  )}
                />
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                className={clsx(
                  'max-h-[90vh] h-fit overflow-y-auto relative rounded-2xl bg-cream shadow-lg z-10',
                  numberOfMonths === 2 ? 'w-[632px]' : 'w-[366px]'
                )}
              >
                <div className='pt-6 px-6'>
                  <Calendar
                    captionLayout={captionLayout}
                    disabled={disabled}
                    minDate={startDate}
                    maxDate={endDate}
                    numberOfMonths={numberOfMonths}
                    onSelect={handleCalendarSelect}
                    paymentDueDate={paymentDueDate}
                    required={required}
                    selected={
                      tempSelectedDate || selectedDateFinal || undefined
                    }
                    showOutsideDays={showOutsideDays}
                  />
                  {/* Legend */}
                  <div className='my-6 flex items-center gap-6'>
                    <div className='flex items-center gap-2'>
                      <span className='inline-block h-4 w-4 rounded bg-blush'></span>
                      <span className='text-sm'>Selected payment date</span>
                    </div>
                    {paymentDueDate && (
                      <div className='flex items-center gap-2'>
                        <span className='inline-block h-4 w-4 rounded border-2 border-blush'></span>
                        <span className='text-sm'>Payment due</span>
                      </div>
                    )}
                  </div>
                  {disclaimer && (
                    <p className='text-xs text-taupe leading-[20px]'>
                      {disclaimer}
                    </p>
                  )}
                  {/* Footer */}
                  <div className='sticky bottom-0 right-0 py-4 w-full bg-cream flex justify-end'>
                    <button
                      type='button'
                      className='w-[138px] rounded-md p-4 text-sm font-semibold uppercase text-taupe hover:text-cream hover:bg-blush'
                      onClick={handleConfirmDate}
                    >
                      Select Date
                    </button>
                  </div>
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
      </div>
      {helpText && !inputError && (
        <p className='mt-1 ml-1 text-xs text-black'>{helpText}</p>
      )}
      {inputError && (
        <p className='text-sm text-red-600 flex items-center gap-2'>
          <FontAwesomeIcon icon={faExclamationCircle} className='h-4 w-4' />
          {inputError}
        </p>
      )}
    </div>
  );
};

export default DatePicker;
