import type { Meta, StoryObj } from "@storybook/react";
import DatePicker from "./DatePicker";

const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered, top",
    docs: {
      description: {
        component: `
The DatePicker component combines a text input field with a calendar button, implemented using [Radix UI's Popover](https://www.radix-ui.com/primitives/docs/components/popover) primitive and the [React Day Picker](https://react-day-picker.js.org/) library. The calendar interface is enhanced with [Font Awesome Pro](https://fontawesome.com/) icons for a polished look. This composition provides a robust foundation for date selection with accessibility built-in.

### Features

- **Date Input**: Supports both manual text entry (MM/DD/YYYY format) and calendar selection
- **Validation**: Built-in date validation with customizable error messages
- **Constraints**: Supports date ranges with min/max dates and excluded dates
- **Payment Due Dates**: Special highlighting for payment due dates
- **Accessibility**: Keyboard navigation and screen reader support through Radix UI
- **Customization**: Supports custom styling and various display options

### Usage

\`\`\`jsx
import { DatePicker } from './DatePicker';

<DatePicker
  label="Select Date"
  placeholder="MM/DD/YYYY"
  required={true}
  startDate={new Date(2024, 0, 1)}
  endDate={new Date(2024, 11, 31)}
/>
\`\`\`

### Dependencies

- [Radix UI Popover](https://www.radix-ui.com/primitives/docs/components/popover)
- [React Day Picker](https://react-day-picker.js.org/)
- [Font Awesome Pro](https://fontawesome.com/)

### Accessibility

The DatePicker follows WCAG guidelines with:
- Proper ARIA labels
- Keyboard navigation
- High contrast visual indicators
- Screen reader support
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// Base story with minimal props
export const Default: Story = {
  args: {
    label: "Select a date",
    placeholder: "MM/DD/YYYY",
  },
  parameters: {
    docs: {
      description: {
        story: `
Basic implementation of the DatePicker:
- Shows the default appearance and behavior
- Includes a label and placeholder
- No date constraints or special configurations
- Calendar opens in the current month
        `,
      },
    },
  },
};

// Story demonstrating date range constraints
export const WithDateRange: Story = {
  args: {
    label: "Select Date within Range",
    startDate: new Date(2024, 0, 1), // Jan 1, 2024
    endDate: new Date(2024, 11, 31), // Dec 31, 2024
    startDateErrorMessage: "Date must be after Jan 1, 2024",
    endDateErrorMessage: "Date must be before Dec 31, 2024",
  },
  parameters: {
    docs: {
      description: {
        story: `
This example shows how to constrain date selection to a specific range:
- \`startDate\`: Sets the minimum selectable date
- \`endDate\`: Sets the maximum selectable date
- Custom error messages for when dates outside the range are selected
        `,
      },
    },
  },
};

// Story with excluded dates
export const WithExcludedDates: Story = {
  args: {
    label: "Select Date (Weekends Excluded)",
    excludeDates: [
      new Date(2025, 4, 3), // A Saturday
      new Date(2025, 4, 4), // A Sunday
      new Date(2025, 0, 13), // Another Saturday
      new Date(2025, 0, 14), // Another Sunday
    ],
    excludeDatesErrorMessage: "Weekends are not available for selection",
  },
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates how to disable specific dates:
- Use \`excludeDates\` to specify dates that cannot be selected
- Provide a custom error message with \`excludeDatesErrorMessage\`
- Useful for blocking weekends, holidays, or other unavailable dates
        `,
      },
    },
  },
};

// Story demonstrating read-only state
export const ReadOnly: Story = {
  args: {
    label: "Read Only Date",
    isReadOnly: true,
    selected: new Date(2024, 0, 15),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows the read-only state of the DatePicker. The calendar popup and text input are both disabled, but the selected date remains visible.",
      },
    },
  },
};

// Story with required field
export const Required: Story = {
  args: {
    label: "Required Date",
    placeholder: "MM/DD/YYYY",
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates required field validation:
- Shows required field indicator
- Enforces date selection
- Useful for mandatory form fields
- Includes built-in validation handling
        `,
      },
    },
  },
};

// Story with help text
export const WithHelpText: Story = {
  args: {
    label: "Select a date",
    placeholder: "MM/DD/YYYY",
    helpText: "Choose a date for your appointment",
  },
  parameters: {
    docs: {
      description: {
        story: `
Shows help text implementation:
- Displays helper text below the input
- Provides additional context to users
- Enhances form field usability
- Can include formatting instructions or guidelines
        `,
      },
    },
  },
};

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    label: "Custom Styled DatePicker",
    placeholder: "MM/DD/YYYY",
    className: "custom-datepicker",
  },
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates custom styling capabilities:
- Shows how to apply custom CSS classes
- Maintains accessibility features
- Can be themed to match design system
- Preserves core functionality while allowing visual customization
        `,
      },
    },
  },
};

// Story with payment due date
export const WithPaymentDueDate: Story = {
  args: {
    label: "Payment Due Date",
    placeholder: "MM/DD/YYYY",
    paymentDueDate: new Date(2024, 0, 31), // January 31, 2024
    disclaimer: "Payment is due by January 31, 2024",
  },
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates payment due date functionality:
- Highlights the payment due date in the calendar
- Shows a disclaimer with the due date
- Useful for payment scheduling and financial applications
- Visual indicators help users identify important dates
        `,
      },
    },
  },
};

// Story with payment due today
export const WithPaymentDueToday: Story = {
  args: {
    label: "Payment Due Date",
    placeholder: "MM/DD/YYYY",
    paymentDueDate: new Date(), // Today
    disclaimer: "Payment is due today",
  },
  parameters: {
    docs: {
      description: {
        story: `
Shows a payment due today scenario:
- Highlights today's date as the payment due date
- Displays urgent payment disclaimer
- Demonstrates real-time date handling
- Useful for showing immediate payment requirements
        `,
      },
    },
  },
};

// Story with overdue payment
export const WithOverduePayment: Story = {
  args: {
    label: "Payment Due Date",
    placeholder: "MM/DD/YYYY",
    paymentDueDate: new Date(2023, 11, 31), // December 31, 2023
    disclaimer: "Payment was due on December 31, 2023",
  },
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates overdue payment scenario:
- Shows a past due date
- Includes warning disclaimer for overdue payment
- Visual indicators for past due dates
- Useful for payment collection and reminder systems
        `,
      },
    },
  },
};

// Story with future payment due date
export const WithFuturePaymentDue: Story = {
  args: {
    label: "Future Payment Due",
    placeholder: "MM/DD/YYYY",
    paymentDueDate: new Date(2024, 11, 31), // December 31, 2024
    disclaimer: "Payment is due by December 31, 2024",
  },
  parameters: {
    docs: {
      description: {
        story: `
Shows future payment due date:
- Highlights a future payment deadline
- Includes informative disclaimer
- Useful for advance payment scheduling
- Demonstrates long-term date planning
        `,
      },
    },
  },
};

// Story with error state
export const WithError: Story = {
  args: {
    label: "Select a date",
    placeholder: "MM/DD/YYYY",
    error: "Please select a valid date",
  },
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates the error state of the DatePicker:
- Shows how validation errors are displayed
- Error message appears below the input field
- Visual indicators show the error state
        `,
      },
    },
  },
};

// Story with all features enabled
export const FullFeatured: Story = {
  args: {
    label: "Full Featured Date Picker",
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2024, 11, 31),
    excludeDates: [new Date(2024, 0, 1)], // New Year's Day
    required: true,
    placeholder: "MM/DD/YYYY",
    helpText: "Select a date between Jan 1 and Dec 31, 2024",
    paymentDueDate: new Date(2024, 0, 31),
    disclaimer: "Payment is due by January 31, 2024",
    error: "Please select a valid date",
  },
  parameters: {
    docs: {
      description: {
        story: `
A comprehensive example showcasing all available features:
- Date range constraints (Jan 1 - Dec 31, 2024)
- Excluded dates (New Year's Day)
- Required field validation
- Help text for user guidance
- Payment due date highlighting
- Disclaimer message
- Error state handling

This story serves as a reference for implementing complex date selection scenarios.
        `,
      },
    },
  },
};

export const WithSelectedDate: Story = {
  args: {
    label: "Select a date",
    placeholder: "MM/DD/YYYY",
    selected: new Date(2024, 0, 15), // January 15, 2024
  },
  parameters: {
    docs: {
      description: {
        story: `
Shows the DatePicker with a pre-selected date:
- Demonstrates how to set an initial selected date
- Calendar opens with the selected month in view
- Date is pre-filled in the input field
        `,
      },
    },
  },
};

export const WithDateConstraints: Story = {
  args: {
    label: "Select a date",
    placeholder: "MM/DD/YYYY",
    startDate: new Date(2024, 0, 1), // January 1, 2024
    endDate: new Date(2024, 11, 31), // December 31, 2024
    selected: new Date(2024, 0, 15),
  },
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates date range constraints:
- Sets minimum date to January 1, 2024
- Sets maximum date to December 31, 2024
- Includes a pre-selected date within the valid range
- Dates outside the range are automatically disabled
        `,
      },
    },
  },
};

export const WithDisabledDates: Story = {
  args: {
    label: "Select a date",
    placeholder: "MM/DD/YYYY",
    disabled: [
      { before: new Date(2024, 0, 1) }, // Disable dates before Jan 1, 2024
      { after: new Date(2024, 11, 31) }, // Disable dates after Dec 31, 2024
      new Date(2024, 0, 15), // Disable specific date
      (date: Date) => date.getDay() === 0 || date.getDay() === 6, // Disable weekends
    ],
    selected: new Date(2024, 0, 2),
  },
  parameters: {
    docs: {
      description: {
        story: `
Shows various ways to disable dates:
- Disable all dates before a specific date
- Disable all dates after a specific date
- Disable individual dates
- Disable dates using a custom function (weekends in this case)
- Pre-selected date is set to a valid (non-disabled) date
        `,
      },
    },
  },
};

export const WithDisclaimer: Story = {
  args: {
    label: "Select a date",
    placeholder: "MM/DD/YYYY",
    disclaimer:
      "All appointments must be scheduled at least 24 hours in advance",
  },
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates the use of disclaimers:
- Shows informational text below the DatePicker
- Useful for communicating important scheduling rules
- Can be used alongside other features like date constraints
        `,
      },
    },
  },
};

export const HideOutsideDays: Story = {
  args: {
    label: "Select a date",
    placeholder: "MM/DD/YYYY",
    showOutsideDays: false,
  },
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates the calendar without outside days:
- Hides dates from previous/next months
- Creates a cleaner calendar appearance
- Useful when you want to focus on the current month only
        `,
      },
    },
  },
};
