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
          className='bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 
                     transition-colors font-medium'
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

      <div className='space-y-8 mt-8'>
        {/* Basic Calendar */}
        <div className='max-w-md mx-auto'>
          <h2 className='text-xl font-bold mb-4'>Basic Calendar</h2>
          <Calendar
            selectedDate={selectedDate}
            paymentDueDate={paymentDueDate}
            onSelectDate={(date) => setSelectedDate(date)}
            defaultMonth={new Date(2025, 5, 1)}
          >
            <Calendar.Heading />
            <Calendar.Grid>
              <Calendar.GridHeader>
                {(weekday) => (
                  <Calendar.HeaderCell>{weekday}</Calendar.HeaderCell>
                )}
              </Calendar.GridHeader>
              <Calendar.GridBody>
                {(date) => <Calendar.Cell date={date} />}
              </Calendar.GridBody>
            </Calendar.Grid>
            <Calendar.Legend>
              <Calendar.LegendItem indicator={<Calendar.SelectedIndicator />}>
                Selected payment date
              </Calendar.LegendItem>
              <Calendar.LegendItem indicator={<Calendar.PaymentDueIndicator />}>
                Payment due
              </Calendar.LegendItem>
            </Calendar.Legend>
            <Calendar.Messaging>
              {selectedDate
                ? `Selected date: ${selectedDate.toLocaleDateString()}`
                : 'Select a payment date'}
            </Calendar.Messaging>
          </Calendar>
        </div>

        {/* Custom Composable Calendar */}
        <div className='max-w-md mx-auto'>
          <h2 className='text-xl font-bold mb-4'>Custom Composable Calendar</h2>
          <Calendar
            selectedDate={selectedDate}
            paymentDueDate={paymentDueDate}
            onSelectDate={(date) => setSelectedDate(date)}
            defaultMonth={new Date(2025, 5, 1)}
            className='border-2 border-blue-200'
          >
            {/* Custom Heading with individual components */}
            <Calendar.Heading className='bg-blue-50 rounded p-2'>
              <Calendar.PrevButton className='text-blue-600 hover:bg-blue-100' />
              <div className='flex items-center space-x-1'>
                <Calendar.MonthSelect className='text-blue-800' />
                <Calendar.YearSelect className='text-blue-800' />
              </div>
              <Calendar.NextButton className='text-blue-600 hover:bg-blue-100' />
            </Calendar.Heading>

            <Calendar.Grid>
              {/* Custom header */}
              <Calendar.GridHeader className='bg-gray-50 rounded'>
                {(weekday) => (
                  <Calendar.HeaderCell className='font-bold text-blue-600'>
                    {weekday}
                  </Calendar.HeaderCell>
                )}
              </Calendar.GridHeader>

              {/* Custom body with custom cell styling */}
              <Calendar.GridBody>
                {(date) => (
                  <Calendar.Cell
                    date={date}
                    className='hover:bg-blue-100 border border-transparent hover:border-blue-200'
                  />
                )}
              </Calendar.GridBody>
            </Calendar.Grid>

            {/* Custom Legend with additional items */}
            <Calendar.Legend className='justify-start space-x-4'>
              <Calendar.LegendItem
                indicator={
                  <Calendar.SelectedIndicator className='bg-purple-200' />
                }
              >
                Your Selection
              </Calendar.LegendItem>
              <Calendar.LegendItem
                indicator={
                  <Calendar.PaymentDueIndicator className='border-red-300' />
                }
              >
                Due Date
              </Calendar.LegendItem>
              <Calendar.LegendItem
                indicator={
                  <div className='w-4 h-4 bg-green-200 rounded-full' />
                }
              >
                Available
              </Calendar.LegendItem>
            </Calendar.Legend>

            {/* Custom Messaging */}
            <Calendar.Messaging className='text-blue-600 font-medium'>
              💡 Pro tip: Select any date to schedule your payment
            </Calendar.Messaging>

            {/* Additional custom content */}
            <div className='text-center space-y-2'>
              <button
                className='bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300'
                disabled={!selectedDate}
              >
                SCHEDULE PAYMENT
              </button>
              <p className='text-xs text-gray-500'>
                Payment will be processed on the selected date
              </p>
            </div>
          </Calendar>
        </div>

        {/* Minimal Calendar */}
        <div className='max-w-md mx-auto'>
          <h2 className='text-xl font-bold mb-4'>Minimal Calendar</h2>
          <Calendar
            selectedDate={selectedDate}
            onSelectDate={(date) => setSelectedDate(date)}
          >
            <Calendar.Grid>
              <Calendar.GridHeader>
                {(weekday) => (
                  <Calendar.HeaderCell className='text-xs'>
                    {weekday}
                  </Calendar.HeaderCell>
                )}
              </Calendar.GridHeader>
              <Calendar.GridBody>
                {(date) => (
                  <Calendar.Cell date={date} className='text-xs h-8 w-8' />
                )}
              </Calendar.GridBody>
            </Calendar.Grid>
          </Calendar>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
