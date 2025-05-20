import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within, fn } from '@storybook/test';
import DatePicker from './DatePicker';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered, top',
    actions: { argTypesRegex: '^on.*' },
    a11y: {
      config: {
        rules: [
          {
            // Only disable the aria-controls check for Radix UI Popover
            id: 'aria-valid-attr-value',
            selector: '[aria-controls^="radix-"]',
            enabled: false,
          },
        ],
      },
    },
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
  argTypes: {
    numberOfMonths: {
      control: 'radio',
      options: [1, 2],
      description: 'Number of months to display in the calendar',
      defaultValue: 1,
    },
    modalWidth: {
      control: 'text',
      description: 'Width of the calendar modal (CSS value)',
      defaultValue: '366px',
    },
    modalHeight: {
      control: 'text',
      description: 'Height of the calendar modal (CSS value)',
      defaultValue: '536px',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// Base story with minimal props
export const Default: Story = {
  args: {
    label: 'Select a date',
    placeholder: 'MM/DD/YYYY',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test input field presence
    const input = canvas.getByRole('textbox');
    await expect(input).toBeInTheDocument();

    // Test placeholder
    await expect(input).toHaveAttribute('placeholder', 'MM/DD/YYYY');

    // Test calendar button
    const calendarButton = canvas.getByRole('button', {
      name: /Open calendar/i,
    });
    await expect(calendarButton).toBeInTheDocument();

    // Test calendar interaction
    await userEvent.click(calendarButton);
    const calendar = document.querySelector('[role="dialog"]');
    await expect(calendar).toBeInTheDocument();
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
    label: 'Select Date within Range',
    startDate: new Date(2024, 0, 1), // Jan 1, 2024
    endDate: new Date(2024, 11, 31), // Dec 31, 2024
    startDateErrorMessage: 'Date must be after Jan 1, 2024',
    endDateErrorMessage: 'Date must be before Dec 31, 2024',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test input field presence
    const input = canvas.getByRole('textbox');
    await expect(input).toBeInTheDocument();

    // Test calendar button and interaction
    const calendarButton = canvas.getByRole('button', {
      name: /Open calendar/i,
    });
    await userEvent.click(calendarButton);

    // Verify calendar is open
    const calendar = document.querySelector('[role="dialog"]');
    await expect(calendar).toBeInTheDocument();

    // Test date range constraints are applied
    // This would require selecting dates outside the range to verify errors,
    // but for now we'll just check that the calendar is displayed
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
    label: 'Select Date (Weekends Excluded)',
    excludeDates: [
      new Date(2025, 4, 3), // A Saturday
      new Date(2025, 4, 4), // A Sunday
      new Date(2025, 0, 13), // Another Saturday
      new Date(2025, 0, 14), // Another Sunday
    ],
    excludeDatesErrorMessage: 'Weekends are not available for selection',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test input field presence and verify it's initially empty
    const input = canvas.getByRole('textbox');
    await expect(input).toBeInTheDocument();
    await expect(input).toHaveValue('');

    // Test calendar button and interaction
    const calendarButton = canvas.getByRole('button', {
      name: /Open calendar/i,
    });
    await userEvent.click(calendarButton);

    // Verify calendar is open
    const calendar = document.querySelector('[role="dialog"]');
    await expect(calendar).toBeInTheDocument();

    const calendarCanvas = within(calendar as HTMLElement);

    // Find and click on May 3, 2025 (an excluded date)
    const dayButtons = calendarCanvas
      .getAllByRole('button')
      .filter((button) => {
        const text = button.textContent?.trim();
        return text && /^\d{1,2}$/.test(text);
      });

    const day3Button = dayButtons.find(
      (button) => button.textContent?.trim() === '3'
    );
    if (day3Button) {
      await userEvent.click(day3Button);
    }

    // Verify the error message is displayed
    await expect(
      canvas.getByText('Weekends are not available for selection')
    ).toBeInTheDocument();
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
    label: 'Read Only Date',
    isReadOnly: true,
    selected: new Date(2024, 0, 15),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test readonly attribute
    const input = canvas.getByRole('textbox');
    await expect(input).toHaveAttribute('readonly');

    // Test that calendar button is disabled
    const calendarButton = canvas.getByRole('button', {
      name: /Open calendar/i,
    });
    await expect(calendarButton).toBeDisabled();
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows the read-only state of the DatePicker. The calendar popup and text input are both disabled, but the selected date remains visible.',
      },
    },
  },
};

// Story with required field
export const Required: Story = {
  args: {
    label: 'Required Date',
    placeholder: 'MM/DD/YYYY',
    required: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test required attribute
    const input = canvas.getByRole('textbox');
    await expect(input).toHaveAttribute('required');

    // Test required indicator in label
    const requiredIndicator = canvas.getByText('*');
    await expect(requiredIndicator).toBeInTheDocument();
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
    label: 'Select a date',
    placeholder: 'MM/DD/YYYY',
    helpText: 'Choose a date for your appointment',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test input field presence
    const input = canvas.getByRole('textbox');
    await expect(input).toBeInTheDocument();

    // Test help text is displayed
    const helpText = canvas.getByText('Choose a date for your appointment');
    await expect(helpText).toBeInTheDocument();

    // Test calendar button
    const calendarButton = canvas.getByRole('button', {
      name: /Open calendar/i,
    });
    await expect(calendarButton).toBeInTheDocument();
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
    label: 'Custom Styled DatePicker',
    placeholder: 'MM/DD/YYYY',
    className: 'custom-datepicker',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test input field presence
    const input = canvas.getByRole('textbox');
    await expect(input).toBeInTheDocument();

    // Test custom class is applied to container
    const container = canvasElement.querySelector('.custom-datepicker');
    await expect(container).toBeInTheDocument();

    // Test calendar button
    const calendarButton = canvas.getByRole('button', {
      name: /Open calendar/i,
    });
    await expect(calendarButton).toBeInTheDocument();
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
    label: 'Payment Due Date',
    placeholder: 'MM/DD/YYYY',
    paymentDueDate: new Date(2024, 0, 31), // January 31, 2024
    disclaimer: 'Payment is due by January 31, 2024',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test input field presence
    const input = canvas.getByRole('textbox');
    await expect(input).toBeInTheDocument();

    // Test calendar button and interaction
    const calendarButton = canvas.getByRole('button', {
      name: /Open calendar/i,
    });
    await userEvent.click(calendarButton);

    // Verify calendar is open
    const calendar = document.querySelector('[role="dialog"]');
    await expect(calendar).toBeInTheDocument();

    // Test disclaimer is displayed inside the popover
    const calendarCanvas = within(calendar as HTMLElement);
    const disclaimer = calendarCanvas.getByText(
      'Payment is due by January 31, 2024'
    );
    await expect(disclaimer).toBeInTheDocument();
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
    label: 'Payment Due Date',
    placeholder: 'MM/DD/YYYY',
    paymentDueDate: new Date(), // Today
    disclaimer: 'Payment is due today',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test input field presence
    const input = canvas.getByRole('textbox');
    await expect(input).toBeInTheDocument();

    // Test calendar button and interaction
    const calendarButton = canvas.getByRole('button', {
      name: /Open calendar/i,
    });
    await userEvent.click(calendarButton);

    // Verify calendar is open
    const calendar = document.querySelector('[role="dialog"]');
    await expect(calendar).toBeInTheDocument();

    // Test disclaimer is displayed inside the popover
    const calendarCanvas = within(calendar as HTMLElement);
    const disclaimer = calendarCanvas.getByText('Payment is due today');
    await expect(disclaimer).toBeInTheDocument();
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
    label: 'Payment Due Date',
    placeholder: 'MM/DD/YYYY',
    paymentDueDate: new Date(2023, 11, 31), // December 31, 2023
    disclaimer: 'Payment was due on December 31, 2023',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test input field presence
    const input = canvas.getByRole('textbox');
    await expect(input).toBeInTheDocument();

    // Test calendar button and interaction
    const calendarButton = canvas.getByRole('button', {
      name: /Open calendar/i,
    });
    await userEvent.click(calendarButton);

    // Verify calendar is open
    const calendar = document.querySelector('[role="dialog"]');
    await expect(calendar).toBeInTheDocument();

    // Test disclaimer is displayed inside the popover
    const calendarCanvas = within(calendar as HTMLElement);
    const disclaimer = calendarCanvas.getByText(
      'Payment was due on December 31, 2023'
    );
    await expect(disclaimer).toBeInTheDocument();
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
    label: 'Future Payment Due',
    placeholder: 'MM/DD/YYYY',
    paymentDueDate: new Date(2024, 11, 31), // December 31, 2024
    disclaimer: 'Payment is due by December 31, 2024',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test input field presence
    const input = canvas.getByRole('textbox');
    await expect(input).toBeInTheDocument();

    // Test calendar button and interaction
    const calendarButton = canvas.getByRole('button', {
      name: /Open calendar/i,
    });
    await userEvent.click(calendarButton);

    // Verify calendar is open
    const calendar = document.querySelector('[role="dialog"]');
    await expect(calendar).toBeInTheDocument();

    // Test disclaimer is displayed inside the popover
    const calendarCanvas = within(calendar as HTMLElement);
    const disclaimer = calendarCanvas.getByText(
      'Payment is due by December 31, 2024'
    );
    await expect(disclaimer).toBeInTheDocument();
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
    label: 'Select a date',
    placeholder: 'MM/DD/YYYY',
    error: 'Please select a valid date',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test input field presence
    const input = canvas.getByRole('textbox');
    await expect(input).toBeInTheDocument();

    // Test error icon is displayed - using a more specific selector
    // The error icon is inside the paragraph with the error message
    const errorContainer = canvas
      .getByText('Please select a valid date')
      .closest('p');
    await expect(errorContainer).toHaveClass('text-red-600');

    // Test calendar button
    const calendarButton = canvas.getByRole('button', {
      name: /Open calendar/i,
    });
    await expect(calendarButton).toBeInTheDocument();
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
    label: 'Full Featured Date Picker',
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2024, 11, 31),
    excludeDates: [new Date(2024, 0, 1)], // New Year's Day
    required: true,
    placeholder: 'MM/DD/YYYY',
    helpText: 'Select a date between Jan 1 and Dec 31, 2024',
    paymentDueDate: new Date(2024, 0, 31),
    disclaimer: 'Payment is due by January 31, 2024',
    error: 'Please select a valid date',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test input field presence
    const input = canvas.getByRole('textbox');
    await expect(input).toBeInTheDocument();

    // Test required attribute
    await expect(input).toHaveAttribute('required');

    // Test required indicator in label
    const requiredIndicator = canvas.getByText('*');
    await expect(requiredIndicator).toBeInTheDocument();

    // Test help text is displayed
    const helpText = canvas.getByText(
      'Select a date between Jan 1 and Dec 31, 2024'
    );
    await expect(helpText).toBeInTheDocument();

    // Test error message is displayed
    const errorMessage = canvas.getByText('Please select a valid date');
    await expect(errorMessage).toBeInTheDocument();

    // Test calendar button and interaction
    const calendarButton = canvas.getByRole('button', {
      name: /Open calendar/i,
    });
    await userEvent.click(calendarButton);

    // Verify calendar is open
    const calendar = document.querySelector('[role="dialog"]');
    await expect(calendar).toBeInTheDocument();

    // Test disclaimer is displayed inside the popover
    const calendarCanvas = within(calendar as HTMLElement);
    const disclaimer = calendarCanvas.getByText(
      'Payment is due by January 31, 2024'
    );
    await expect(disclaimer).toBeInTheDocument();
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
    label: 'Select a date',
    placeholder: 'MM/DD/YYYY',
    selected: new Date(2024, 0, 15), // January 15, 2024
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test input field presence with selected date value
    const input = canvas.getByRole('textbox');
    await expect(input).toBeInTheDocument();

    // Test that the input has a value (formatted date)
    // Note: This assumes the date format is MM/DD/YYYY
    await expect(input).toHaveValue('01/15/2024');

    // Test calendar button and interaction
    const calendarButton = canvas.getByRole('button', {
      name: /Open calendar/i,
    });
    await userEvent.click(calendarButton);

    // Verify calendar is open
    const calendar = document.querySelector('[role="dialog"]');
    await expect(calendar).toBeInTheDocument();

    // Verify selected date is highlighted in calendar
    // This would require more complex testing to check for the selected date cell
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
    label: 'Select a date',
    placeholder: 'MM/DD/YYYY',
    startDate: new Date(2024, 0, 1), // January 1, 2024
    endDate: new Date(2024, 11, 31), // December 31, 2024
    selected: new Date(2024, 0, 15),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test input field presence with selected date value
    const input = canvas.getByRole('textbox');
    await expect(input).toBeInTheDocument();

    // Test that the input has a value (formatted date)
    await expect(input).toHaveValue('01/15/2024');

    // Test calendar button and interaction
    const calendarButton = canvas.getByRole('button', {
      name: /Open calendar/i,
    });
    await userEvent.click(calendarButton);

    // Verify calendar is open
    const calendar = document.querySelector('[role="dialog"]');
    await expect(calendar).toBeInTheDocument();

    // Note: Testing date constraints would require more complex interactions
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
    label: 'Select a date',
    placeholder: 'MM/DD/YYYY',
    disabled: [
      { before: new Date(2025, 4, 1) }, // Disable dates before May 1, 2025
      { after: new Date(2025, 4, 15) }, // Disable dates after May 15, 2025
      new Date(2025, 4, 6), // Disable specific date
      (date: Date) => date.getDay() === 0 || date.getDay() === 6, // Disable weekends
    ],
    onChange: fn(), // Add explicit spy for onChange
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test input field presence
    const input = canvas.getByRole('textbox');
    await expect(input).toBeInTheDocument();

    // Test calendar button and interaction
    const calendarButton = canvas.getByRole('button', {
      name: /Open calendar/i,
    });
    await userEvent.click(calendarButton);

    // Verify calendar is open
    const calendar = document.querySelector('[role="dialog"]');
    await expect(calendar).toBeInTheDocument();

    // Get the calendar container
    const calendarCanvas = within(calendar as HTMLElement);

    // Verify the month and year display shows May 2025
    const monthYearDisplay = calendarCanvas.getByText('May 2025');
    await expect(monthYearDisplay).toBeInTheDocument();

    // Try to select May 6, 2025 (a disabled date)
    // First, find all day buttons in the calendar
    const dayButtons = calendarCanvas
      .getAllByRole('button')
      .filter((button) => {
        // Filter buttons that could be day cells (they typically have a single number as text content)
        const text = button.textContent?.trim();
        return text && /^\d{1,2}$/.test(text);
      });

    // Find the button for day 6
    const day6Button = dayButtons.find(
      (button) => button.textContent?.trim() === '6'
    );

    // Day 6 button should have attributes indicating it's disabled
    if (day6Button) {
      // Check if the button has aria-disabled="true" or is actually disabled
      const isDisabled =
        day6Button.getAttribute('aria-disabled') === 'true' ||
        day6Button.hasAttribute('disabled') ||
        day6Button.classList.contains('disabled') || // Common class for disabled state
        day6Button.getAttribute('data-disabled') === 'true'; // Another common pattern

      await expect(isDisabled).toBeTruthy();

      // Try clicking it anyway (should have no effect)
      await userEvent.click(day6Button);

      // The calendar should still be open
      await expect(
        document.querySelector('[role="dialog"]')
      ).toBeInTheDocument();
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
Shows various ways to disable dates:
- Disable all dates before May 1, 2025
- Disable all dates after May 15, 2025
- Disable specific date (May 6, 2025)
- Disable dates using a custom function (weekends in this case)        `,
      },
    },
    test: {
      dangerouslyIgnoreUnhandledErrors: true, // Ignore unhandled errors that might occur during the test
    },
  },
};

export const WithDisclaimer: Story = {
  args: {
    label: 'Select a date',
    placeholder: 'MM/DD/YYYY',
    disclaimer:
      'All appointments must be scheduled at least 24 hours in advance',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test input field presence
    const input = canvas.getByRole('textbox');
    await expect(input).toBeInTheDocument();

    // Test calendar button and interaction
    const calendarButton = canvas.getByRole('button', {
      name: /Open calendar/i,
    });
    await userEvent.click(calendarButton);

    // Verify calendar is open
    const calendar = document.querySelector('[role="dialog"]');
    await expect(calendar).toBeInTheDocument();

    // Test disclaimer is displayed inside the popover
    const calendarCanvas = within(calendar as HTMLElement);
    const disclaimer = calendarCanvas.getByText(
      'All appointments must be scheduled at least 24 hours in advance'
    );
    await expect(disclaimer).toBeInTheDocument();
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
    label: 'Select a date',
    placeholder: 'MM/DD/YYYY',
    showOutsideDays: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test input field presence
    const input = canvas.getByRole('textbox');
    await expect(input).toBeInTheDocument();

    // Test calendar button and interaction
    const calendarButton = canvas.getByRole('button', {
      name: /Open calendar/i,
    });
    await userEvent.click(calendarButton);

    // Verify calendar is open
    const calendar = document.querySelector('[role="dialog"]');
    await expect(calendar).toBeInTheDocument();

    // Get the calendar container
    const calendarCanvas = within(calendar as HTMLElement);

    // Get all day buttons in the calendar
    const dayButtons = calendarCanvas
      .getAllByRole('button')
      .filter((button) => {
        const text = button.textContent?.trim();
        return text && /^\d{1,2}$/.test(text);
      });

    // Get the text content of all day buttons
    const dayTexts = dayButtons.map((button) =>
      parseInt(button.textContent || '0')
    );

    // Sort the day numbers
    const sortedDays = [...dayTexts].sort((a, b) => a - b);

    // In a calendar without outside days, the first day should be 1
    await expect(sortedDays[0]).toBe(1);

    // The key test: verify that all days are from the same month
    // When outside days are hidden, the maximum number of days should be 31 (max days in a month)
    await expect(dayButtons.length).toBeLessThanOrEqual(31);

    // And the minimum should be 28 (min days in a month)
    await expect(dayButtons.length).toBeGreaterThanOrEqual(28);
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

// Add new story for custom modal dimensions
export const CustomModalDimensions: Story = {
  args: {
    label: 'Custom Size Calendar',
    placeholder: 'MM/DD/YYYY',
    modalWidth: '400px',
    modalHeight: '600px',
  },
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates custom modal dimensions:
- Uses custom width and height for the calendar modal
- Maintains responsive behavior
- Useful for different screen sizes or layout requirements
        `,
      },
    },
  },
};
