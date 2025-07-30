import { FC, useMemo } from 'react';
import clsx from 'clsx';
import { format as dateFnsFormat, addMonths } from 'date-fns';
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import {
  MonthSelectProps,
  YearSelectProps,
  MonthYearSelectProps,
} from './types';
import { useCalendarContext } from './CalendarContext';

const selectBaseClasses = clsx(
  'py-1 pr-4 pl-3 border border-gray-200 rounded-md bg-white text-pink-900 cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 inline-flex items-center justify-between'
);

const selectContentClasses = clsx(
  'bg-white rounded-md border border-gray-200 shadow-md overflow-hidden z-50' // Ensure dropdown is above other content
);

const selectItemClasses = clsx(
  'py-2 px-4 text-pink-900 cursor-pointer outline-none hover:bg-gray-10 focus:bg-gray-100 data-[highlighted]:bg-pink-100 data-[state=checked]:bg-pink-50 data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed'
);

const scrollButtonClasses = clsx(
  'flex items-center justify-center h-6 bg-white cursor-default hover:bg-pink-50'
);

export const MonthYearSelect: FC<MonthYearSelectProps> = ({
  className,
  optionsBefore = 0,
  optionsAfter = 12,
  ...props
}) => {
  const { month, setMonth } = useCalendarContext();

  // Memoize the options array to prevent unnecessary recreations
  const options = useMemo(() => {
    return Array.from({ length: optionsBefore + optionsAfter + 1 }, (_, i) => {
      const date = addMonths(month, i - optionsBefore);
      return {
        value: date.toISOString(),
        label: dateFnsFormat(date, 'MMMM yyyy'),
      };
    });
  }, [month, optionsBefore, optionsAfter]);

  return (
    <Select.Root
      value={month.toISOString()}
      onValueChange={(value) => setMonth(new Date(value))}
    >
      <Select.Trigger
        className={clsx(selectBaseClasses, 'min-w-[160px]', className)}
        aria-label='Select month and year'
        {...props}
      >
        <Select.Value />
        <Select.Icon>
          <ChevronDownIcon className='h-4 w-4 opacity-50' />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className={clsx(selectContentClasses, className)}
          position='popper'
          sideOffset={4}
          align='start'
          alignOffset={0}
          avoidCollisions={true}
        >
          <Select.ScrollUpButton
            className={clsx(scrollButtonClasses, className)}
          >
            <ChevronUpIcon className='h-4 w-4' />
          </Select.ScrollUpButton>
          <Select.Viewport className='p-1'>
            {options.map(({ value, label }) => (
              <Select.Item
                key={value}
                value={value}
                className={clsx(selectItemClasses, className)}
              >
                <Select.ItemText>{label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton
            className={clsx(scrollButtonClasses, className)}
          >
            <ChevronDownIcon className='h-4 w-4' />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export const MonthSelect: FC<MonthSelectProps> = ({ className, ...props }) => {
  const { month, setMonth } = useCalendarContext();
  const currentMonth = month.getMonth();

  // Memoize the options array to prevent unnecessary recreations
  const options = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const date = new Date(month.getFullYear(), i, 1);
      return {
        value: i.toString(),
        label: dateFnsFormat(date, 'MMMM'),
      };
    });
  }, [month]);

  return (
    <Select.Root
      value={currentMonth.toString()}
      onValueChange={(value) => {
        const newMonth = new Date(month);
        newMonth.setMonth(parseInt(value));
        setMonth(newMonth);
      }}
    >
      <Select.Trigger
        className={clsx(selectBaseClasses, 'min-w-[120px]', className)}
        aria-label='Select month'
        {...props}
      >
        <Select.Value />
        <Select.Icon>
          <ChevronDownIcon className='h-4 w-4 opacity-50' />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className={clsx(selectContentClasses, className)}
          position='popper'
          sideOffset={4}
        >
          <Select.ScrollUpButton
            className={clsx(scrollButtonClasses, className)}
          >
            <ChevronUpIcon className='h-4 w-4' />
          </Select.ScrollUpButton>
          <Select.Viewport className='p-1'>
            {options.map(({ value, label }) => (
              <Select.Item
                key={value}
                value={value}
                className={clsx(selectItemClasses, className)}
              >
                <Select.ItemText>{label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton
            className={clsx(scrollButtonClasses, className)}
          >
            <ChevronDownIcon className='h-4 w-4' />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export const YearSelect: FC<YearSelectProps> = ({
  className,
  optionsBefore = 20,
  optionsAfter = 20,
  ...props
}) => {
  const { month, setMonth } = useCalendarContext();
  const currentYear = month.getFullYear();

  // Memoize the options array to prevent unnecessary recreations
  const options = useMemo(() => {
    return Array.from({ length: optionsBefore + optionsAfter + 1 }, (_, i) => {
      const year = currentYear - optionsBefore + i;
      return {
        value: year.toString(),
        label: year.toString(),
      };
    });
  }, [currentYear, optionsBefore, optionsAfter]);

  return (
    <Select.Root
      value={currentYear.toString()}
      onValueChange={(value) => {
        const newMonth = new Date(month);
        newMonth.setFullYear(parseInt(value));
        setMonth(newMonth);
      }}
    >
      <Select.Trigger
        className={clsx(selectBaseClasses, className)}
        aria-label='Select year'
        {...props}
      >
        <Select.Value />
        <Select.Icon>
          <ChevronDownIcon className='h-4 w-4 opacity-50' />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className={clsx(selectContentClasses, className)}
          position='popper'
          sideOffset={4}
        >
          <Select.ScrollUpButton
            className={clsx(scrollButtonClasses, className)}
          >
            <ChevronUpIcon className='h-4 w-4' />
          </Select.ScrollUpButton>
          <Select.Viewport className='p-1 max-h-[200px] overflow-y-auto'>
            {options.map(({ value, label }) => (
              <Select.Item
                key={value}
                value={value}
                className={clsx(selectItemClasses, className)}
              >
                <Select.ItemText>{label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton
            className={clsx(scrollButtonClasses, className)}
          >
            <ChevronDownIcon className='h-4 w-4' />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
