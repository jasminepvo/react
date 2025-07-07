import { FC } from 'react';
import { NavigationButtonProps } from './types';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useCalendar } from './CalendarContext';
import { addMonths, subMonths } from 'date-fns';
import clsx from 'clsx';

const baseButtonStyles = 'p-2 rounded-lg hover:bg-gray-100 transition-colors';

export const PrevButton: FC<Omit<NavigationButtonProps, 'direction'>> = ({
  className,
}) => {
  const { month, setMonth } = useCalendar();

  const handlePrevMonth = () => {
    setMonth(subMonths(month, 1));
  };

  return (
    <button
      onClick={handlePrevMonth}
      className={clsx(baseButtonStyles, className)}
    >
      <ChevronLeftIcon className='w-5 h-5' />
    </button>
  );
};

export const NextButton: FC<Omit<NavigationButtonProps, 'direction'>> = ({
  className,
}) => {
  const { month, setMonth } = useCalendar();

  const handleNextMonth = () => {
    setMonth(addMonths(month, 1));
  };

  return (
    <button
      onClick={handleNextMonth}
      className={clsx(baseButtonStyles, className)}
    >
      <ChevronRightIcon className='w-5 h-5' />
    </button>
  );
};
