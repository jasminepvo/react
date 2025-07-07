import { ReactNode } from 'react';

export interface CompoundComponentProps {
    className?: string;
    children?: ReactNode;
}

export interface CalendarProps extends CompoundComponentProps {
    selectedDate?: Date;
    paymentDueDate?: Date;
    onSelectDate: (date: Date) => void;
    defaultMonth?: Date;
}

export type CaptionProps = CompoundComponentProps;

export interface GridHeaderProps extends CompoundComponentProps {
    weekdayChar?: number;
    weekStartsOn?: 0 | 1; // 0 for Sunday, 1 for Monday
}

export interface GridBodyProps extends CompoundComponentProps {
    showOutsideDays?: boolean;
    weekStartsOn?: 0 | 1; // 0 for Sunday, 1 for Monday
}

export interface LegendItemProps extends CompoundComponentProps {
    type?: 'selected' | 'payment-due' | 'today';
}

export type CaptionLayout = 'label' | 'dropdown' | 'dropdown-months' | 'dropdown-years';

export interface DayPickerConfig {
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
    showOutsideDays?: boolean;
    outsideDayClassName?: string;
}

// Header cell props
export interface HeaderCellProps extends BaseCalendarProps {
    children: ReactNode;
}

// Cell props
export interface CellProps extends BaseCalendarProps {
    date: Date;
    isOutsideDay?: boolean;
    variant?: 'default' | 'selected' | 'payment-due' | 'today';
}

// Indicator props
export interface IndicatorProps extends BaseCalendarProps {
    type?: 'selected' | 'payment-due';
}

// Messaging props
export type MessagingProps = BaseCalendarProps
