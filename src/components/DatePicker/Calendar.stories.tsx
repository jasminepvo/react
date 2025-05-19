import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './Calender';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    captionLayout: {
      description:
        'Controls how the calendar caption (month/year) is displayed',
      defaultValue: 'label',
    },
  },
  decorators: [
    (Story) => (
      <div className='bg-white border border-taupe/20 drop-shadow-2xl rounded-lg p-10'>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Base calendar with minimal props
export const Default: Story = {
  args: {
    classNames: {
      root: 'bg-white',
    },
  },
};

// Calendar with selected date
export const WithSelectedDate: Story = {
  args: {
    selected: new Date(2024, 0, 15), // January 15, 2024
  },
};

// Calendar with date constraints
export const WithDateConstraints: Story = {
  args: {
    minDate: new Date(2024, 0, 1), // January 1, 2024
    maxDate: new Date(2024, 11, 31), // December 31, 2024
    selected: new Date(2024, 0, 15),
  },
};

// Calendar with disabled dates
export const WithDisabledDates: Story = {
  args: {
    disabled: [
      { before: new Date(2024, 0, 1) }, // Disable dates before Jan 1, 2024
      { after: new Date(2024, 11, 31) }, // Disable dates after Dec 31, 2024
      new Date(2024, 0, 15), // Disable specific date
      (date: Date) => date.getDay() === 0 || date.getDay() === 6, // Disable weekends
    ],
    selected: new Date(2024, 0, 2),
  },
};

// Calendar with custom styles
export const WithCustomStyles: Story = {
  args: {
    classNames: {
      day: 'h-12 w-12 text-blue-700 font-medium hover:bg-blue-100 rounded-full',
      selected: 'bg-blue-600 text-white hover:bg-blue-700',
      today: 'text-red-600 font-bold',
    },
  },
};

// Calendar with payment due date
export const WithPaymentDueDate: Story = {
  args: {
    selected: new Date(2024, 0, 15),
    paymentDueDate: new Date(2024, 0, 31),
  },
};

// Calendar with required selection
export const Required: Story = {
  args: {
    required: true,
  },
};

// Calendar showing outside days
export const WithOutsideDays: Story = {
  args: {
    showOutsideDays: true,
    selected: new Date(2024, 0, 15),
  },
};

// Calendar with all features
export const FullFeatured: Story = {
  args: {
    selected: new Date(2024, 0, 15),
    minDate: new Date(2024, 0, 1),
    maxDate: new Date(2024, 11, 31),
    disabled: [(date: Date) => date.getDay() === 0 || date.getDay() === 6],
    required: true,
    showOutsideDays: true,
    paymentDueDate: new Date(2024, 0, 31),
    classNames: {
      day: 'h-12 w-12 font-medium hover:bg-gray-100 rounded-full',
      selected: 'bg-blue-600 text-white hover:bg-blue-700',
      today: 'text-red-600 font-bold',
      disabled: 'text-gray-300 hover:bg-transparent cursor-not-allowed',
    },
  },
};

// Calendar with different caption layouts
export const WithCaptionLayouts: Story = {
  args: {
    selected: new Date(2024, 0, 15),
    captionLayout: 'dropdown',
  },
};
