import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './Calender';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className='bg-white border border-taupe/20 rounded-lg drop-shadow-2xl p-6' >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Base calendar with minimal props
export const Default: Story = {
  args: {
    // classNames: {
    //   root: 'bg-white',
    // },
  },
};



export const WithDateConstraints: Story = {
  args: {
    minDate: new Date(2025, 4, 4), 
    maxDate: new Date(2025, 4, 10), 
    selected: new Date(2025, 4, 4),
  },
};

// Calendar with different caption layouts
export const WithCaptionLayouts: Story = {
  args: {
    selected: new Date(2024, 0, 15),
    captionLayout: 'dropdown',
  },
};
