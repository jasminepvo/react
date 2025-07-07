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
          onSelectDate={(date) => setSelectedDate(date)}
          defaultMonth={new Date()}
          className='border border-gray-200 rounded-lg shadow-sm bg-pink-300'
        >
          <Calendar.Heading className='bg-pink-500 p-4 rounded-t-lg border-b border-gray-200'>
            <div className='flex items-center justify-between'>
              <Calendar.Navigation direction='prev' />
              <Calendar.MonthYearSelect
                className='bg-pink-600 border-pink-400'
                optionsBefore={2}
                optionsAfter={6}
              />
              <Calendar.Navigation direction='next' />
            </div>
          </Calendar.Heading>

          <Calendar.Grid className='p-4'>
            <Calendar.GridHeader
              className='mb-2'
              weekdayChar={2}
              weekStartsOn={0}
            />
            <Calendar.GridBody showOutsideDays weekStartsOn={0} />
          </Calendar.Grid>

          <Calendar.Legend>
            <Calendar.LegendItem type='selected'>
              Selected Date
            </Calendar.LegendItem>
            <Calendar.LegendItem type='payment-due'>
              Payment Due
            </Calendar.LegendItem>
            
          </Calendar.Legend>

          <Calendar.Messaging className='text-gray-600 text-sm p-4'>
            Payments scheduled after 11:59 PM EST will be processed the next
            business day
          </Calendar.Messaging>
        </Calendar>
        <p>Selected Date: {selectedDate?.toLocaleDateString()}</p>
      </div>

      {/* Basic Calendar */}
      <div className='max-w-md mx-auto mt-8'>
        <h2 className='text-xl font-bold mb-4'>Basic Calendar</h2>
        <Calendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          className='border rounded p-4 bg-pink-200'
        >
          <Calendar.Heading className='flex items-center justify-start mb-4 bg-pink-500 p-4 rounded-t-lg'>
            <Calendar.Navigation direction='prev' />
            <Calendar.Navigation direction='next' />
            <Calendar.Caption className='text-gray-700 font-medium' />
            <Calendar.MonthSelect
              className='bg-purple-400 border-pink-400 text-white'
              optionsBefore={6}
              optionsAfter={5}
            />
            <Calendar.YearSelect
              className='bg-purple-400 border-pink-400 text-white'
              optionsAfter={10}
            />
          </Calendar.Heading>
          <Calendar.Grid>
            <Calendar.GridHeader
              className='mb-2'
              weekdayChar={1}
              weekStartsOn={1}
            />
            <Calendar.GridBody weekStartsOn={1} showOutsideDays={false} />
          </Calendar.Grid>
        </Calendar>
      </div>
    </div>
  );
};

export default CalendarPage;
