import React, { ReactNode } from 'react';
import { useDateFieldContext } from './DateFieldContext';
import {
  validateDateInput,
  validDateFormat,
  formatDateInput,
  parseDateWithFormat,
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

/**
 * @description Input component for DateField
 * @param {InputProps} props - The props for the Input component
 * @param {string} props.placeholder - The placeholder of the Input component
 * @param {string} props.name - The name of the Input component
 * @param {string} props.id - The id of the Input component
 * @param {string} props.className - The className of the Input component
 * @param {React.CSSProperties} props.style - The style of the Input component
 * @param {React.ReactNode} props.children - The children of the Input component
 * @returns {React.ReactNode} The Input component
 */

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
    console.log('🔍 DateField Input - Raw input value:', input);
    ctx.setInputError('');

    // Use the format from context, defaulting to MM/dd/yyyy
    const format = ctx.format || 'MM/dd/yyyy';
    console.log('📅 DateField Input - Using format:', format);

    input = formatDateInput(input, format);
    console.log('✨ DateField Input - Formatted input:', input);
    ctx.setInputValue(input);

    if (input.length === 10 && validDateFormat(input, format)) {
      console.log('✅ DateField Input - Input is complete and valid format');
      const parsedDate = parseDateWithFormat(input, format);
      console.log('📅 DateField Input - Parsed date:', parsedDate);

      if (parsedDate) {
        console.log('🎯 DateField Input - Date parsed successfully');
        const validationError = validateDateInput({
          minDate: ctx.minDate!,
          maxDate: ctx.maxDate!,
          formattedDate: input,
          excludeDates: ctx.excludeDates!,
          startDateErrorMessage: ctx.startDateErrorMessage,
          endDateErrorMessage: ctx.endDateErrorMessage,
          excludeDatesErrorMessage: ctx.excludeDatesErrorMessage,
        });
        console.log('🔍 DateField Input - Validation error:', validationError);

        if (validationError) {
          console.log(
            '❌ DateField Input - Validation failed:',
            validationError
          );
          ctx.setInputError(validationError);
        } else {
          console.log('✅ DateField Input - Validation passed, setting date');
          ctx.setValue(parsedDate);
          ctx.setInputError('');
        }
      } else {
        console.log('❌ DateField Input - Failed to parse date');
        ctx.setInputError('Please enter a valid date.');
      }
    } else {
      console.log(
        '⏳ DateField Input - Input incomplete or invalid format (length:',
        input.length,
        ')'
      );
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
