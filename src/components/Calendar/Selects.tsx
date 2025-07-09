import { FC } from 'react';
import clsx from 'clsx';
import { format as dateFnsFormat, addMonths, addYears } from 'date-fns';
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import {
  SelectOptionsProps,
} from './types';
import { useCalendarContext } from './CalendarContext';

const selectBaseClasses = clsx(
  'py-1 pr-4 pl-3',
  'border border-gray-200 rounded-md',
  'bg-white text-pink-900',
  'cursor-pointer appearance-none',
  'focus:outline-none focus:ring-2 focus:ring-blue-500',
  'inline-flex items-center justify-between'
);

const selectContentClasses = clsx(
  'bg-white',
  'rounded-md',
  'shadow-md',
  'overflow-hidden',
  'z-50' // Ensure dropdown is above other content
);

const selectItemClasses = clsx(
  'py-2 px-4',
  'text-pink-900',
  'cursor-pointer',
  'outline-none',
  'data-[highlighted]:bg-pink-100',
  'data-[state=checked]:bg-pink-50',
  'data-[disabled]:opacity-50',
  'data-[disabled]:cursor-not-allowed'
);

const scrollButtonClasses = clsx(
  'flex items-center justify-center',
  'h-6 bg-white cursor-default',
  'hover:bg-pink-50'
);

export const MonthYearSelect: FC<SelectOptionsProps> = ({
  className,
  optionsBefore = 0,
  optionsAfter = 12,
}) => {
  const { month, setMonth } = useCalendarContext();

  const options = Array.from(
    { length: optionsBefore + optionsAfter + 1 },
    (_, i) => {
      const date = addMonths(month, i - optionsBefore);
      return {
        value: date.toISOString(),
        label: dateFnsFormat(date, 'MMMM yyyy'),
      };
    }
  );

  return (
    <Select.Root
      value={month.toISOString()}
      onValueChange={(value) => setMonth(new Date(value))}
    >
      <Select.Trigger
        className={clsx(selectBaseClasses, 'min-w-[160px]', className)}
        aria-label='Select month and year'
      >
        <Select.Value />
        <Select.Icon>
          <ChevronDownIcon className='h-4 w-4 opacity-50' />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className={selectContentClasses}
          position='popper'
          sideOffset={4}
          align='start'
          alignOffset={0}
          avoidCollisions={true}
        >
          <Select.ScrollUpButton className={scrollButtonClasses}>
            <ChevronUpIcon className='h-4 w-4' />
          </Select.ScrollUpButton>
          <Select.Viewport className='p-1'>
            {options.map(({ value, label }) => (
              <Select.Item
                key={value}
                value={value}
                className={selectItemClasses}
              >
                <Select.ItemText>{label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className={scrollButtonClasses}>
            <ChevronDownIcon className='h-4 w-4' />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export const MonthSelect: FC<SelectOptionsProps> = ({
  className,
  optionsBefore = 0,
  optionsAfter = 11,
}) => {
  const { month, setMonth } = useCalendarContext();
  const currentMonth = month.getMonth();

  const options = Array.from(
    { length: optionsBefore + optionsAfter + 1 },
    (_, i) => {
      const monthIndex = (currentMonth - optionsBefore + i + 12) % 12;
      const date = new Date(month.getFullYear(), monthIndex, 1);
      return {
        value: monthIndex.toString(),
        label: dateFnsFormat(date, 'MMMM'),
      };
    }
  );

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
      >
        <Select.Value />
        <Select.Icon>
          <ChevronDownIcon className='h-4 w-4 opacity-50' />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className={selectContentClasses}
          position='popper'
          sideOffset={4}
        >
          <Select.ScrollUpButton className={scrollButtonClasses}>
            <ChevronUpIcon className='h-4 w-4' />
          </Select.ScrollUpButton>
          <Select.Viewport className='p-1'>
            {options.map(({ value, label }) => (
              <Select.Item
                key={value}
                value={value}
                className={selectItemClasses}
              >
                <Select.ItemText>{label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className={scrollButtonClasses}>
            <ChevronDownIcon className='h-4 w-4' />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export const YearSelect: FC<SelectOptionsProps> = ({
  className,
  optionsBefore = 0,
  optionsAfter = 5,
}) => {
  const { month, setMonth } = useCalendarContext();

  const options = Array.from(
    { length: optionsBefore + optionsAfter + 1 },
    (_, i) => {
      const date = addYears(month, i - optionsBefore);
      return {
        value: date.getFullYear().toString(),
        label: date.getFullYear().toString(),
      };
    }
  );

  return (
    <Select.Root
      value={month.getFullYear().toString()}
      onValueChange={(value) => {
        const newMonth = new Date(month);
        newMonth.setFullYear(parseInt(value));
        setMonth(newMonth);
      }}
    >
      <Select.Trigger
        className={clsx(selectBaseClasses, className)}
        aria-label='Select year'
      >
        <Select.Value>{month.getFullYear()}</Select.Value>
        <Select.Icon>
          <ChevronDownIcon className='h-4 w-4 opacity-50' />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className={selectContentClasses}
          position='popper'
          sideOffset={4}
        >
          <Select.ScrollUpButton className={scrollButtonClasses}>
            <ChevronUpIcon className='h-4 w-4' />
          </Select.ScrollUpButton>
          <Select.Viewport className='p-1'>
            {options.map(({ value, label }) => (
              <Select.Item
                key={value}
                value={value}
                className={selectItemClasses}
              >
                <Select.ItemText>{label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className={scrollButtonClasses}>
            <ChevronDownIcon className='h-4 w-4' />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
