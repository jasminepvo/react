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
        <h1 className='text-4xl font-bold'>Calendar Component</h1>
        <Link
          to='/'
          className='bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 
                     transition-colors font-medium'
        >
          ← Back to Home
        </Link>
      </div>

      <div className='max-w-md mx-auto space-y-10 flex flex-col gap-4'>
        {/* Calendar Component */}
        <Calendar
          selectedDate={selectedDate}
          paymentDueDate={paymentDueDate}
          onSelectDate={setSelectedDate}
          defaultMonth={new Date()}
          className='border border-gray-200 rounded-lg shadow-sm'
        >
          {/* Custom Header */}
          <Calendar.Heading className='bg-pink-500 p-4 rounded-t-lg border-b border-gray-200'>
            <Calendar.PrevButton className='text-gray-600 hover:bg-gray-100 rounded-md p-2' />
            <div className='flex items-center space-x-2'>
              <Calendar.MonthSelect className='text-gray-800 font-medium' />
              <Calendar.YearSelect className='text-gray-800 font-medium' />
            </div>
            <Calendar.NextButton className='text-gray-600 hover:bg-gray-100 rounded-md p-2' />
          </Calendar.Heading>

          {/* Calendar Grid */}
          <Calendar.Grid className='p-4'>
            <Calendar.GridHeader
              render={(weekday: string) => (
                <Calendar.HeaderCell className='text-gray-500 font-medium'>
                  {weekday.slice(0, 2)}
                </Calendar.HeaderCell>
              )}
            />

            <Calendar.GridBody
              render={(date: Date) => (
                <Calendar.Cell
                  date={date}
                  className='hover:bg-blue-50 rounded-full transition-colors'
                />
              )}
            />
          </Calendar.Grid>

          {/* Legend */}
          <Calendar.Legend className='px-4 pb-2 border-t border-gray-100 pt-3'>
            <Calendar.LegendItem type='selected'>
              Selected Date
            </Calendar.LegendItem>
            <Calendar.LegendItem type='payment-due'>
              Payment Due
            </Calendar.LegendItem>
          </Calendar.Legend>

          {/* Status Message */}
          <Calendar.Messaging>
            Payments scheduled after 11:59 PM EST will be processed the next
            business day
          </Calendar.Messaging>
        </Calendar>
      </div>
    </div>
  );
};

export default CalendarPage;
