import type { Meta, StoryObj } from "@storybook/react";
import { addDays, subDays } from "date-fns";
import { DatePickerSingle } from "./DatePickerSingle";
import { DatePickerMultiple } from "./DatePickerMultiple";
import { DatePickerRange } from "./DatePickerRange";

const meta = {
  title: "Components/DatePicker",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

// Single Date Picker Stories
export const SingleDatePicker: StoryObj<typeof DatePickerSingle> = {
  render: (args) => <DatePickerSingle {...args} />,
  args: {
    label: "Select Date",
    placeholder: "MM/DD/YYYY",
  },
};

export const RequiredSingleDate: StoryObj<typeof DatePickerSingle> = {
  render: (args) => <DatePickerSingle {...args} />,
  args: {
    label: "Due Date",
    required: true,
    errorMessage: "Please select a due date",
    placeholder: "MM/DD/YYYY",
  },
};

export const SingleDateWithConstraints: StoryObj<typeof DatePickerSingle> = {
  render: (args) => <DatePickerSingle {...args} />,
  args: {
    label: "Select Date (Limited Range)",
    minDate: subDays(new Date(), 7),
    maxDate: addDays(new Date(), 30),
    placeholder: "MM/DD/YYYY",
  },
};

// Multiple Dates Picker Stories
export const MultipleDatePicker: StoryObj<typeof DatePickerMultiple> = {
  render: (args) => <DatePickerMultiple {...args} />,
  args: {
    label: "Select Multiple Dates",
    placeholder: "Click to select dates",
  },
};

export const LimitedMultipleDates: StoryObj<typeof DatePickerMultiple> = {
  render: (args) => <DatePickerMultiple {...args} />,
  args: {
    label: "Select Up to 3 Dates",
    maxDates: 3,
    placeholder: "Click to select dates",
  },
};

// Date Range Picker Stories
export const DateRangePicker: StoryObj<typeof DatePickerRange> = {
  render: (args) => <DatePickerRange {...args} />,
  args: {
    label: "Select Date Range",
    placeholder: "Select start and end dates",
  },
};

export const DateRangeWithLimits: StoryObj<typeof DatePickerRange> = {
  render: (args) => <DatePickerRange {...args} />,
  args: {
    label: "Book a Stay",
    minRange: 2,
    maxRange: 14,
    placeholder: "Select check-in and check-out dates",
    disclaimer: "Minimum stay: 2 nights, Maximum stay: 14 nights",
  },
};
