import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from '../components/Calendar';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const paymentDueDate = new Date();
  paymentDueDate.setDate(paymentDueDate.getDate() + 7);

  return (
    <div className='p-10'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-4xl font-bold'>Payment Calendar</h1>
        <Link
          to='/'
          className='text-pink-500 hover:text-pink-600 transition-colors font-medium flex items-center gap-2'
        >
          ← Back to Home
        </Link>
      </div>

      <div className='max-w-md mx-auto'>
        <div className='mb-8'>
          <h2 className='text-2xl font-bold mb-2'>Schedule Your Payment</h2>
          <p className='text-gray-600'>
            Select a date to schedule your payment
          </p>
        </div>

        {/* Schedule Payment Button */}
        <button
          className='w-full bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 
                     transition-colors disabled:bg-gray-300 mb-6 font-medium'
          disabled={!selectedDate}
        >
          Schedule Payment
        </button>

        {/* Calendar Component */}
        <Calendar
          selectedDate={selectedDate}
          paymentDueDate={paymentDueDate}
          onSelectDate={setSelectedDate}
          defaultMonth={new Date()}
          className='border border-gray-200 rounded-lg shadow-sm'
        >
          {/* Custom Header */}
          <Calendar.Heading className='bg-gray-50 p-4 rounded-t-lg border-b border-gray-200'>
            <Calendar.PrevButton className='text-gray-600 hover:bg-gray-100 rounded-md p-2' />
            <div className='flex items-center space-x-2'>
              <Calendar.MonthSelect className='text-gray-800 font-medium' />
              <Calendar.YearSelect className='text-gray-800 font-medium' />
            </div>
            <Calendar.NextButton className='text-gray-600 hover:bg-gray-100 rounded-md p-2' />
          </Calendar.Heading>

          {/* Calendar Grid */}
          <Calendar.Grid className='p-4'>
            <Calendar.GridHeader>
              {(weekday) => (
                <Calendar.HeaderCell className='text-gray-500 font-medium'>
                  {weekday.slice(0, 3)}
                </Calendar.HeaderCell>
              )}
            </Calendar.GridHeader>

            <Calendar.GridBody>
              {(date) => (
                <Calendar.Cell
                  date={date}
                  className='hover:bg-blue-50 rounded-full transition-colors'
                />
              )}
            </Calendar.GridBody>
          </Calendar.Grid>

          {/* Legend */}
          <Calendar.Legend className='px-4 pb-2 border-t border-gray-100 pt-3'>
            <Calendar.LegendItem
              indicator={<Calendar.SelectedIndicator className='bg-blue-200' />}
            >
              Selected Date
            </Calendar.LegendItem>
            <Calendar.LegendItem
              indicator={
                <Calendar.PaymentDueIndicator className='border-2 border-yellow-300 bg-yellow-100' />
              }
            >
              Payment Due
            </Calendar.LegendItem>
          </Calendar.Legend>

          {/* Status Message */}
          <Calendar.Messaging className='text-gray-600 text-sm text-center pb-4'>
            {selectedDate
              ? `Payment will be processed on ${selectedDate.toLocaleDateString()}`
              : 'Select a date to schedule your payment'}
          </Calendar.Messaging>
        </Calendar>

        {/* Additional Information */}
        <p className='text-xs text-gray-500 mt-4 text-center'>
          Payments scheduled after 11:59 PM EST will be processed the next
          business day
        </p>
      </div>
    </div>
  );
};

export default CalendarPage;
