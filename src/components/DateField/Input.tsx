import React, { ReactNode } from 'react';
import { useDateFieldContext } from './DateFieldContext';
import {
  validateDateInput,
  validDateFormat,
  formatDateInput,
} from '../DatePicker/helper';
import clsx from 'clsx';

interface InputProps {
  placeholder?: string;
  name?: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode; // For the trigger and popover content
}

const Input: React.FC<InputProps> = ({
  placeholder = 'Select date',
  name,
  id,
  className = '',
  style,
  children,
}) => {
  const ctx = useDateFieldContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    ctx.setInputError('');
    input = formatDateInput(input);
    ctx.setInputValue(input);

    if (input.length === 10 && validDateFormat(input)) {
      const validationError = validateDateInput({
        minDate: ctx.minDate!,
        maxDate: ctx.maxDate!,
        formattedDate: input,
        excludeDates: ctx.excludeDates!,
        startDateErrorMessage: ctx.startDateErrorMessage,
        endDateErrorMessage: ctx.endDateErrorMessage,
        excludeDatesErrorMessage: ctx.excludeDatesErrorMessage,
      });
      if (validationError) {
        ctx.setInputError(validationError);
      } else {
        const [month, day, year] = input.split('/');
        const date = new Date(`${year}-${month}-${day}` as string);
        ctx.setValue(date);
        ctx.setInputError('');
      }
    } else {
      ctx.setInputError('');
    }
  };

  const hasError = !!ctx.inputError;

  return (
    <div
      className={clsx(
        'relative flex items-center bg-white rounded-lg border',
        {
          'border-gray-300 focus-within:border-pink-400 focus-within:ring-2 focus-within:ring-pink-400':
            !hasError,
          'border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500':
            hasError,
        },
        className
      )}
      style={style}
    >
      <input
        ref={ctx.inputRef}
        type='text'
        className='flex-1 px-3 py-2 bg-transparent focus:outline-none'
        value={ctx.inputValue || ''}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={ctx.disabled}
        name={name}
        id={id}
        required={ctx.required}
        readOnly={false}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id || name}-error` : undefined}
      />

      {children}
    </div>
  );
};

export default Input;
