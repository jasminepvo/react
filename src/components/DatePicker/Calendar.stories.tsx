import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './Calender';

const meta = {
  title: 'Components/DatePicker/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='bg-white border border-taupe/20 rounded-lg drop-shadow-2xl p-6'>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A flexible calendar subcomponent that powers the DatePicker's date selection interface. Built on [react-day-picker](https://react-day-picker.js.org/), it provides a robust foundation for date selection with the following capabilities:

#### Key Features
- Single date selection with visual feedback
- Customizable month/year navigation via dropdown or buttons
- Date range constraints (min/max dates)
- Full keyboard navigation support
- Screen reader compatibility

#### Implementation Notes
- This is an internal component used by the DatePicker
- All Calendar props are passed through the DatePicker component
- Styling is consistent with the design system using Tailwind CSS
- Includes built-in support for payment due date highlighting

For usage examples, please refer to the DatePicker component documentation.
`,
      },
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Base calendar with minimal props
export const Default: Story = {};
