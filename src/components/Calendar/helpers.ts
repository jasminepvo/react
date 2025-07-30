import { isSameMonth, isSameDay, Day } from 'date-fns';
import clsx from 'clsx';

/**
 * Helper function to format weekday names based on the specified format
 * @param fullName - The full weekday name (e.g., "Monday", "Tuesday")
 * @param format - The desired format: 'short' (1 char), 'med' (2 chars), 'long' (3 chars), or 'full' (full name)
 * @returns The formatted weekday name
 */
export function formatWeekdayName(
    fullName: string,
    format: 'short' | 'med' | 'long' | 'full'
): string {
    if (format === 'short') return fullName[0];
    if (format === 'med') return fullName.slice(0, 2);
    if (format === 'long') return fullName.slice(0, 3);
    if (format === 'full') return fullName;
    return fullName;
}

/**
 * Convert weekStartsOn string to date-fns number format
 * @param weekStartsOn - The day the week starts on
 * @returns The corresponding number for date-fns
 */
export function getWeekStartsOnNum(weekStartsOn: 'sunday' | 'monday' | 'saturday'): Day {
    if (weekStartsOn === 'monday') return 1;
    if (weekStartsOn === 'saturday') return 6;
    return 0; // Default to Sunday
}

/**
 * Group dates into weeks for calendar display
 * @param dates - Array of dates to group
 * @returns Array of weeks, where each week is an array of 7 dates
 */
export function groupDatesIntoWeeks(dates: Date[]): Date[][] {
    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];

    dates.forEach((date) => {
        currentWeek.push(date);
        if (currentWeek.length === 7) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    });

    return weeks;
}

/**
 * Generate CSS classes for calendar day cells based on their state
 * @param date - The date to generate classes for
 * @param month - The current month being displayed
 * @param selectedDate - The currently selected date
 * @param paymentDueDate - The payment due date
 * @param focusedDate - The currently focused date
 * @param outsideDayClassName - Optional custom class for outside days
 * @returns CSS classes string
 */
export function getDayClasses(
    date: Date,
    month: Date,
    selectedDate?: Date,
    paymentDueDate?: Date,
    focusedDate?: Date,
    outsideDayClassName?: string
): string {
    const isOutsideMonth = !isSameMonth(date, month);
    const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
    const isPaymentDue = paymentDueDate ? isSameDay(date, paymentDueDate) : false;
    const isToday = isSameDay(date, new Date());
    const isFocused = focusedDate ? isSameDay(date, focusedDate) : false;

    const baseClasses = 'aspect-square text-md cursor-pointer';

    return clsx(baseClasses, {
        // Text colors - only apply default outside styling if no custom class provided
        'bg-pink-100 text-pink-300': isOutsideMonth && !isSelected && !outsideDayClassName,
        'text-white': isSelected,
        'font-bold': isToday,

        // Background colors
        'bg-white': !isOutsideMonth && !isSelected && !isFocused,
        'bg-pink-500': isSelected,
        'bg-pink-200': isFocused && !isSelected,
        'hover:bg-pink-500': !isSelected,

        // Borders and special states
        'outline outline-1 outline-yellow-400': isPaymentDue,
        'focus:ring-2 focus:ring-pink-500 focus:ring-offset-2': true,
        'focus:outline-none': true,
    }, outsideDayClassName && isOutsideMonth ? outsideDayClassName : '');
}

/**
 * Calculate the target date when navigating to the previous month
 * @param currentDate - The current date being navigated from
 * @param month - The current month
 * @param setMonth - Function to set the month
 * @returns The target date in the previous month, or undefined if not found
 */
export function calculatePreviousMonthDate(
    currentDate: Date,
    month: Date,
    setMonth: (month: Date) => void
): Date | undefined {
    const prevMonth = new Date(month);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setMonth(prevMonth);

    const currentDayOfWeek = currentDate.getDay();
    const prevMonthEnd = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0);

    // Calculate the last week of the previous month
    const lastWeekStart = new Date(prevMonthEnd);
    lastWeekStart.setDate(prevMonthEnd.getDate() - prevMonthEnd.getDay());

    // Find the same day of week in the last week
    const targetDate = new Date(lastWeekStart);
    targetDate.setDate(lastWeekStart.getDate() + currentDayOfWeek);

    return targetDate;
}

/**
 * Calculate the target date when navigating to the next month
 * @param currentDate - The current date being navigated from
 * @param month - The current month
 * @param setMonth - Function to set the month
 * @returns The target date in the next month, or undefined if not found
 */
export function calculateNextMonthDate(
    currentDate: Date,
    month: Date,
    setMonth: (month: Date) => void
): Date | undefined {
    const nextMonth = new Date(month);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setMonth(nextMonth);

    const currentDayOfWeek = currentDate.getDay();
    const nextMonthStart = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1);

    // Find the same day of week in the first week
    const firstWeekStart = new Date(nextMonthStart);
    firstWeekStart.setDate(nextMonthStart.getDate() - nextMonthStart.getDay());

    const targetDate = new Date(firstWeekStart);
    targetDate.setDate(firstWeekStart.getDate() + currentDayOfWeek);

    return targetDate;
} 