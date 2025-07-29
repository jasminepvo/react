import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from '../components/Calendar';
import { DateField } from '../components/DateField';

const CalendarKeyboardDemo: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [dateFieldDate, setDateFieldDate] = useState<Date | undefined>();

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4'>
      <div className='max-w-4xl mx-auto'>
        <div className='flex items-center justify-between mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>
            Calendar Keyboard Navigation Demo
          </h1>
          <Link
            to='/calendar'
            className='bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 
                     transition-colors font-medium'
          >
            ← Back to Calendar
          </Link>
        </div>

        {/* Keyboard Navigation Instructions */}
        <div className='bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8'>
          <h2 className='text-xl font-semibold text-blue-900 mb-4'>
            Keyboard Navigation Instructions
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800'>
            <div>
              <h3 className='font-semibold mb-2'>Navigation Keys:</h3>
              <ul className='space-y-1'>
                <li>
                  <kbd className='bg-blue-100 px-2 py-1 rounded'>←</kbd>{' '}
                  <kbd className='bg-blue-100 px-2 py-1 rounded'>→</kbd>{' '}
                  Navigate between days
                </li>
                <li>
                  <kbd className='bg-blue-100 px-2 py-1 rounded'>↑</kbd>{' '}
                  <kbd className='bg-blue-100 px-2 py-1 rounded'>↓</kbd>{' '}
                  Navigate between weeks
                </li>
                <li>
                  <kbd className='bg-blue-100 px-2 py-1 rounded'>Home</kbd> Go
                  to first date in view
                </li>
                <li>
                  <kbd className='bg-blue-100 px-2 py-1 rounded'>End</kbd> Go to
                  last date in view
                </li>
              </ul>
            </div>
            <div>
              <h3 className='font-semibold mb-2'>Action Keys:</h3>
              <ul className='space-y-1'>
                <li>
                  <kbd className='bg-blue-100 px-2 py-1 rounded'>Enter</kbd> or{' '}
                  <kbd className='bg-blue-100 px-2 py-1 rounded'>Space</kbd>{' '}
                  Select focused date
                </li>
                <li>
                  <kbd className='bg-blue-100 px-2 py-1 rounded'>Escape</kbd>{' '}
                  Close popover (in DateField)
                </li>
                <li>
                  <kbd className='bg-blue-100 px-2 py-1 rounded'>Tab</kbd>{' '}
                  Navigate between interactive elements
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Standalone Calendar */}
          <div className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>
              Standalone Calendar
            </h2>
            <p className='text-gray-600 mb-4'>
              Use arrow keys to navigate, Enter/Space to select dates.
            </p>
            <Calendar
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              defaultMonth={new Date()}
              className='border border-gray-200 rounded-lg'
            >
              <Calendar.Heading className='flex items-center justify-between mb-4 p-4 bg-gray-50 rounded-t-lg'>
                <Calendar.Navigation direction='prev' />
                <Calendar.MonthYearSelect />
                <Calendar.Navigation direction='next' />
              </Calendar.Heading>
              <Calendar.Grid className='p-4'>
                <Calendar.GridHeader />
                <Calendar.GridBody />
              </Calendar.Grid>
            </Calendar>
            <div className='mt-4 p-3 bg-gray-50 rounded'>
              <p className='text-sm text-gray-700'>
                Selected:{' '}
                {selectedDate ? selectedDate.toLocaleDateString() : 'None'}
              </p>
            </div>
          </div>

          {/* DateField with Calendar */}
          <div className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>
              DateField with Calendar Popup
            </h2>
            <p className='text-gray-600 mb-4'>
              Click the calendar icon to open the popup, then use keyboard
              navigation.
            </p>
            <DateField
              value={dateFieldDate}
              onDateChange={setDateFieldDate}
              className='w-full'
            >
              <DateField.Label className='block text-sm font-medium text-gray-700 mb-2'>
                Select a Date
              </DateField.Label>
              <div className='relative'>
                <DateField.Input placeholder='MM/DD/YYYY' className='w-full'>
                  <DateField.Popover>
                    <DateField.Trigger />
                    <DateField.PopoverPanel>
                      <Calendar
                        selectedDate={dateFieldDate}
                        onSelectDate={setDateFieldDate}
                        defaultMonth={new Date()}
                        className='p-4'
                      >
                        <Calendar.Heading className='flex items-center justify-between mb-4'>
                          <Calendar.Navigation direction='prev' />
                          <Calendar.MonthYearSelect />
                          <Calendar.Navigation direction='next' />
                        </Calendar.Heading>
                        <Calendar.Grid>
                          <Calendar.GridHeader />
                          <Calendar.GridBody />
                        </Calendar.Grid>
                        <div className='flex justify-end mt-4'>
                          <Calendar.ActionItemButton detectedContextType='calendar'>
                            Select Date
                          </Calendar.ActionItemButton>
                        </div>
                      </Calendar>
                    </DateField.PopoverPanel>
                  </DateField.Popover>
                </DateField.Input>
              </div>
            </DateField>
            <div className='mt-4 p-3 bg-gray-50 rounded'>
              <p className='text-sm text-gray-700'>
                Selected:{' '}
                {dateFieldDate ? dateFieldDate.toLocaleDateString() : 'None'}
              </p>
            </div>
          </div>
        </div>

        {/* Accessibility Features */}
        <div className='mt-8 bg-green-50 border border-green-200 rounded-lg p-6'>
          <h2 className='text-xl font-semibold text-green-900 mb-4'>
            Accessibility Features
          </h2>
          <ul className='space-y-2 text-sm text-green-800'>
            <li>✓ Full keyboard navigation support</li>
            <li>✓ Proper ARIA labels and roles</li>
            <li>✓ Focus management and visual indicators</li>
            <li>✓ Screen reader friendly</li>
            <li>✓ WCAG 2.1 AA compliant</li>
            <li>✓ High contrast visual focus indicators</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalendarKeyboardDemo;
