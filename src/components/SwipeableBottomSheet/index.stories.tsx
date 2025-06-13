import type { Meta, StoryObj } from '@storybook/react';
import { SwipeableBottomSheet } from './SwipeableBottomSheet';
import { useState } from 'react';

const meta: Meta<typeof SwipeableBottomSheet> = {
  title: 'Components/SwipeableBottomSheet',
  component: SwipeableBottomSheet,
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  decorators: [
    (Story) => (
      <div className='h-[667px] w-[375px] relative bg-gray-100 overflow-hidden'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SwipeableBottomSheet>;

// Wrapper component to handle state
const BottomSheetWrapper = ({
  children,
  ...props
}: Partial<React.ComponentProps<typeof SwipeableBottomSheet>> & {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className='px-4 py-2 bg-blush text-cream rounded-md'
        onClick={() => setIsOpen(true)}
      >
        Open Sheet
      </button>
      <SwipeableBottomSheet
        id='story-bottom-sheet'
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        {...props}
      >
        {children}
      </SwipeableBottomSheet>
    </>
  );
};

// Basic usage
export const Basic: Story = {
  render: () => (
    <BottomSheetWrapper>
      <div className='space-y-4'>
        <p>Basic bottom sheet with simple content.</p>
        <p>Swipe down or tap overlay to dismiss.</p>
      </div>
    </BottomSheetWrapper>
  ),
};

// With Header and Footer
export const WithHeaderAndFooter: Story = {
  render: () => (
    <BottomSheetWrapper
      header={<div className='text-xl font-semibold'>Sheet Title</div>}
      footerButtons={
        <div className='flex justify-end space-x-2'>
          <button className='px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md'>
            Cancel
          </button>
          <button className='px-4 py-2 bg-blush text-cream rounded-md hover:bg-blush'>
            Confirm
          </button>
        </div>
      }
    >
      <div className='space-y-4'>
        <p>This example includes a header and footer with action buttons.</p>
        <p>The footer is not sticky by default.</p>
      </div>
    </BottomSheetWrapper>
  ),
};

// With Sticky Footer
export const WithStickyFooter: Story = {
  render: () => (
    <BottomSheetWrapper
      header={<div className='text-xl font-semibold'>Scrollable Content</div>}
      footerButtons={
        <div className='flex justify-end space-x-2'>
          <button className='px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md'>
            Cancel
          </button>
          <button className='px-4 py-2 bg-blush text-cream rounded-md hover:bg-blush'>
            Confirm
          </button>
        </div>
      }
      stickyFooter
    >
      <div className='space-y-4'>
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i}>
            Scrollable content item {i + 1}. The footer will remain visible
            while scrolling.
          </p>
        ))}
      </div>
    </BottomSheetWrapper>
  ),
};

// Custom Swipe Threshold
export const CustomSwipeThreshold: Story = {
  render: () => (
    <BottomSheetWrapper
      swipeDownThreshold={100}
      header={
        <div className='text-xl font-semibold'>Custom Swipe Threshold</div>
      }
    >
      <div className='space-y-4'>
        <p>This sheet requires a longer swipe (100px) to dismiss.</p>
        <p>Try swiping down with different intensities.</p>
      </div>
    </BottomSheetWrapper>
  ),
};

// Custom Styling
export const CustomStyling: Story = {
  render: () => (
    <BottomSheetWrapper
      className='bg-brown text-cream'
      header={
        <div className='text-xl font-semibold font-italiana'>
          Custom Styled Sheet
        </div>
      }
      footerButtons={
        <div className='flex justify-end space-x-2'>
          <button className='px-4 py-2 text-cream hover:bg-taupe/20 rounded-md'>
            Cancel
          </button>
          <button className='px-4 py-2 bg-blush text-brown rounded-md hover:bg-blush/90'>
            Confirm
          </button>
        </div>
      }
    >
      <div className='space-y-4'>
        <p>This example uses custom colors and styling from the theme.</p>
        <p>The design matches your application's color scheme.</p>
      </div>
    </BottomSheetWrapper>
  ),
};

// Custom Width
export const WithCustomWidth: Story = {
  render: () => (
    <BottomSheetWrapper
      width={300}
      header={<div className='text-xl font-semibold'>Custom Width</div>}
    >
      <div className='space-y-4'>
        <p>This bottom sheet has a width of 300 pixels.</p>
        <p>Without a width prop, it defaults to full width.</p>
      </div>
    </BottomSheetWrapper>
  ),
};

// Percentage Width
export const PercentageWidth: Story = {
  render: () => (
    <BottomSheetWrapper
      width='75%'
      header={<div className='text-xl font-semibold'>75% Width</div>}
    >
      <div className='space-y-4'>
        <p>This bottom sheet takes up 75% of the screen width.</p>
        <p>It will resize responsively.</p>
      </div>
    </BottomSheetWrapper>
  ),
};

// Full Width
export const FullWidth: Story = {
  render: () => (
    <BottomSheetWrapper
      width='full'
      header={<div className='text-xl font-semibold'>Full Width</div>}
    >
      <div className='space-y-4'>
        <p>This bottom sheet spans the full width of the screen.</p>
        <p>This is the default behavior if no width is specified.</p>
      </div>
    </BottomSheetWrapper>
  ),
};
