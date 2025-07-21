import React from 'react';
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
}

const Input: React.FC<InputProps> = ({
  placeholder = 'Select date',
  name,
  id,
  className = '',
  style,
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

  return (
    <input
      ref={ctx.inputRef}
      type='text'
      className={clsx(
        'w-full px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-400',
        className
      )}
      value={ctx.inputValue || ''}
      onChange={handleInputChange}
      placeholder={placeholder}
      disabled={ctx.disabled}
      name={name}
      id={id}
      readOnly={false}
      style={style}
    />
  );
};

export default Input;
