import React, { MouseEventHandler, HTMLAttributes } from 'react';
import { CalendarMonth, CalendarDay, Modifiers } from 'react-day-picker';

interface NavigationBarProps {
  onPreviousClick?: MouseEventHandler<HTMLButtonElement>;
  onNextClick?: MouseEventHandler<HTMLButtonElement>;
}

interface CaptionProps {
  calendarMonth: CalendarMonth;
}

interface WeekdaysProps extends HTMLAttributes<HTMLTableRowElement> {
  weekdays?: string[];
}

interface MonthGridProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children?: React.ReactNode;
}

interface WeeksContainerProps extends HTMLAttributes<HTMLTableSectionElement> {
  children?: React.ReactNode;
}

interface WeekRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children?: React.ReactNode;
}

interface DayCellProps extends HTMLAttributes<HTMLDivElement> {
  day: CalendarDay;
  modifiers: Modifiers;
}

interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  selected?: Date;
}

export function CustomNavigationBar({
  onPreviousClick,
  onNextClick,
}: NavigationBarProps) {
  return (
    <nav className='calendar-nav flex justify-between items-center p-2'>
      <button onClick={onPreviousClick} aria-label='Previous Month'>
        ←
      </button>
      <button onClick={onNextClick} aria-label='Next Month'>
        →
      </button>
    </nav>
  );
}

export function CustomMonthCaption({ calendarMonth }: CaptionProps) {
  const displayMonth = calendarMonth.date;
  return (
    <div className='calendar-caption text-lg font-bold text-center py-2'>
      {displayMonth.toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      })}
    </div>
  );
}

export function CustomWeekdaysRow({ weekdays = [], ...props }: WeekdaysProps) {
  return (
    <tr {...props}>
      {weekdays.map((weekday, idx) => (
        <th key={idx} className='calendar-weekday text-xs text-gray-500 py-1'>
          {weekday}
        </th>
      ))}
    </tr>
  );
}

export function CustomMonthGrid({ children, ...props }: MonthGridProps) {
  return (
    <table className='calendar-month-grid w-full border-collapse' {...props}>
      <thead>{children && Array.isArray(children) && children[0]}</thead>
      <tbody>{children && Array.isArray(children) && children.slice(1)}</tbody>
    </table>
  );
}

export function CustomWeeksContainer({
  children,
  ...props
}: WeeksContainerProps) {
  return <tbody {...props}>{children}</tbody>;
}

export function CustomWeekRow({ children, ...props }: WeekRowProps) {
  return <tr {...props}>{children}</tr>;
}

export function CustomDayCell({ day, modifiers, ...props }: DayCellProps) {
  const isSelected = modifiers.selected;
  const isToday = modifiers.today;
  const isDisabled = modifiers.disabled;
  const isOutside = modifiers.outside;

  return (
    <td>
      <div
        {...props}
        className={[
          'w-8 h-8 rounded-full flex items-center justify-center transition',
          isSelected ? 'bg-blue-500 text-white' : '',
          isToday ? 'border border-blue-500' : '',
          isOutside ? 'text-gray-300' : '',
          isDisabled ? 'opacity-50 cursor-not-allowed' : '',
          props.className || '',
        ].join(' ')}
        role='button'
        aria-selected={isSelected}
        aria-current={isToday ? 'date' : undefined}
      >
        {day.date.getDate()}
      </div>
    </td>
  );
}

export function CustomFooter({ selected, ...props }: FooterProps) {
  return (
    <div
      {...props}
      aria-live='polite'
      className='calendar-footer text-sm text-center py-2'
    >
      {selected
        ? `Selected date: ${selected.toLocaleDateString()}`
        : 'No date selected'}
    </div>
  );
}

// export function NavigationBar({ onPreviousClick, onNextClick }) {
//   return (
//     <div className='calendar-nav'>
//       <button onClick={onPreviousClick} aria-label='Previous Month'>
//         ←
//       </button>
//       <button onClick={onNextClick} aria-label='Next Month'>
//         →
//       </button>
//     </div>
//   );
// }

// export function MonthCaption({ displayMonth }) {
//   return (
//     <div className='calendar-caption'>
//       {displayMonth.toLocaleString('default', {
//         month: 'long',
//         year: 'numeric',
//       })}
//     </div>
//   );
// }

// export function WeekdaysRow({ weekdays }) {
//   return (
//     <tr>
//       {weekdays.map((weekday, idx) => (
//         <th key={idx}>{weekday}</th>
//       ))}
//     </tr>
//   );
// }

// export function Weeks({ weeks, ...props }) {
//   return (
//     <tbody>
//       {weeks.map((week, i) => (
//         <tr key={i}>
//           {week.map((day, j) => (
//             <Day key={j} {...day} />
//           ))}
//         </tr>
//       ))}
//     </tbody>
//   );
// }

// export function Day({ date, modifiers, onDayClick }) {
//   const classes = [
//     modifiers.selected && 'selected',
//     modifiers.disabled && 'disabled',
//     modifiers.today && 'today',
//     modifiers.outside && 'outside',
//   ]
//     .filter(Boolean)
//     .join(' ');
//   return (
//     <td>
//       <button
//         className={classes}
//         onClick={() => onDayClick(date)}
//         disabled={modifiers.disabled}
//         aria-current={modifiers.today ? 'date' : undefined}
//       >
//         {date.getDate()}
//       </button>
//     </td>
//   );
// }
