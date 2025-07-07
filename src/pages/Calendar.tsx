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

      <div className='max-w-md mx-auto'>
        {/* Main Calendar */}
        <Calendar
          selectedDate={selectedDate}
          paymentDueDate={paymentDueDate}
          onSelectDate={setSelectedDate}
          defaultMonth={new Date()}
          className='border border-gray-200 rounded-lg shadow-sm'
        >
          <Calendar.Heading className='bg-pink-500 p-4 rounded-t-lg border-b border-gray-200'>
            <div className='flex items-center justify-between'>
              <Calendar.Navigation navLayout='around' className='text-white' />
              <Calendar.Caption className='text-white font-medium'>
                <div className='flex gap-2'>
                  <Calendar.MonthSelect className='calendar-select bg-pink-600 border-pink-400 text-white' />
                  <Calendar.YearSelect className='calendar-select bg-pink-600 border-pink-400 text-white' />
                </div>
              </Calendar.Caption>
            </div>
          </Calendar.Heading>

          <Calendar.Grid className='p-4'>
            <Calendar.GridHeader
              className='calendar-week-header mb-2 text-gray-600'
              weekdayChar={3}
            />
            <Calendar.GridBody outsideDays />
          </Calendar.Grid>

          <Calendar.Legend className='calendar-legend'>
            <Calendar.LegendItem
              type='selected'
              className='calendar-legend-item'
            >
              Selected Date
            </Calendar.LegendItem>
            <Calendar.LegendItem
              type='payment-due'
              className='calendar-legend-item'
            >
              Payment Due
            </Calendar.LegendItem>
          </Calendar.Legend>

          <Calendar.Messaging className='text-gray-600 text-sm text-center p-4'>
            Payments scheduled after 11:59 PM EST will be processed the next
            business day
          </Calendar.Messaging>
        </Calendar>
      </div>

      {/* Basic Calendar */}
      <div className='max-w-md mx-auto mt-8'>
        <h2 className='text-xl font-bold mb-4'>Basic Calendar</h2>
        <Calendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          className='border rounded p-4'
        >
          <Calendar.Heading>
            <div className='flex items-center justify-between mb-4'>
              <Calendar.Navigation />
              <Calendar.Caption captionLayout='label' />
            </div>
          </Calendar.Heading>
          <Calendar.Grid>
            <Calendar.GridHeader className='calendar-week-header mb-2 text-gray-600' weekdayChar={1} />
            <Calendar.GridBody />
          </Calendar.Grid>
        </Calendar>
      </div>
    </div>
  );
};

export default CalendarPage;
