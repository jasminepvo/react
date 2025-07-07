import { ReactNode } from 'react';

export type NavLayout = 'around' | 'after';
export type CaptionLayout = 'label' | 'dropdown' | 'dropdown-months' | 'dropdown-years';

export interface DayPickerConfig {
    navLayout: NavLayout;
    captionLayout: CaptionLayout;
    showWeekNumber: boolean;
    fixedWeeks: boolean;
    showOutsideDays: boolean;
    hideWeekdays: boolean;
    numberOfMonths: number;
}

// Context type
export interface CalendarContextType {
    selectedDate?: Date;
    paymentDueDate?: Date;
    onSelectDate: (date: Date) => void;
    defaultMonth?: Date;
    month: Date;
    setMonth: (month: Date) => void;
    dayPickerConfig: DayPickerConfig;
    setDayPickerConfig: (config: DayPickerConfig | ((prev: DayPickerConfig) => DayPickerConfig)) => void;
}

// Base props that all calendar components share
export interface BaseCalendarProps {
    className?: string;
    children?: ReactNode;
}

// Main Calendar component props
export interface CalendarProps extends BaseCalendarProps {
    selectedDate?: Date;
    paymentDueDate?: Date;
    onSelectDate: (date: Date) => void;
    defaultMonth?: Date;
}

// Heading component props
export interface HeadingProps extends BaseCalendarProps {
    className?: string;
}

// Navigation button props
export interface NavigationButtonProps extends BaseCalendarProps {
    direction: 'prev' | 'next';
}

// Select props for month/year dropdowns
export interface SelectProps extends BaseCalendarProps {
    type: 'month' | 'year';
}

// Grid props
export interface GridProps extends BaseCalendarProps {
    layout?: 'default' | 'compact';
    outsideDays?: 'hidden' | 'visible';
    outsideDayClassName?: string;
}

// Grid header props
export interface GridHeaderProps extends BaseCalendarProps {
    render?: (weekday: string) => ReactNode;
}

// Header cell props
export interface HeaderCellProps extends BaseCalendarProps {
    children: ReactNode;
}

// Grid body props
export interface GridBodyProps extends BaseCalendarProps {
    render?: (date: Date, isOutsideDay?: boolean) => ReactNode;
    outsideDays?: 'hidden' | 'visible';
    outsideDayClassName?: string;
}

// Cell props
export interface CellProps extends BaseCalendarProps {
    date: Date;
    isOutsideDay?: boolean;
    variant?: 'default' | 'selected' | 'payment-due' | 'today';
}

// Legend item props
export interface LegendItemProps extends BaseCalendarProps {
    indicator?: ReactNode;
}

// Indicator props
export interface IndicatorProps extends BaseCalendarProps {
    type?: 'selected' | 'payment-due';
}

// Messaging props
export type MessagingProps = BaseCalendarProps
