import { Counter } from './components/Counter';
import { Hangman } from './components/Hangman';
import { TicTacToe } from './components/TicTacToe';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import DatePicker from './components/DatePicker/DatePicker';
import { Calendar } from './components/Calendar';

function App() {
  const [singleDate, setSingleDate] = useState<Date | undefined>(new Date());

  const handleDateChange = (date: Date | null) => {
    setSingleDate(date || undefined);
  };

  // For demonstration, we'll set a default due date 7 days from now
  const paymentDueDate = new Date();
  paymentDueDate.setDate(paymentDueDate.getDate() + 7);

  return (
    <div className='p-10'>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <span className='font-italiana text-5xl lg:text-7xl italic'>
            React
          </span>
          <span className='text-5xl lg:text-7xl font-thin'> Components</span>
        </div>
        <Link
          to='/calendar'
          className='bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 
                     transition-colors font-medium'
        >
          View Calendar
        </Link>
      </div>

      <hr className='border-t border-gray-300 w-full my-4' />
      <hr className='border-t border-gray-300 w-full my-4' />
      <Counter />
      <hr className='border-t border-gray-300 w-full my-4' />
      <hr className='border-t border-gray-300 w-full my-4' />
      <Hangman />
      <hr className='border-t border-gray-300 w-full my-4' />
      <hr className='border-t border-gray-300 w-full my-4' />
      <TicTacToe />
      <hr className='border-t border-gray-300 w-full my-4' />
      <hr className='border-t border-gray-300 w-full my-4' />

      <h2 className='text-2xl font-bold text-brown mb-4'>Date Picker</h2>
      <DatePicker
        selected={singleDate}
        onChange={handleDateChange}
        label='Payment Date'
        placeholder='MM/DD/YYYY'
        disclaimer="In order for your payment to be credited today, please select today's date as the payment date and submit your payment before 11:59 PM EST."
        paymentDueDate={new Date(2025, 3, 10)}
        startDate={new Date(2025, 0, 1)}
        endDate={new Date(2025, 11, 31)}
        required={false}
        className='max-w-xl mt-8'
        helpText='This is a help text'
        captionLayout='dropdown'
      />

      <div className='space-y-8 mt-8'>
        {/* Basic Calendar */}
        <div className='max-w-md mx-auto'>
          <h2 className='text-xl font-bold mb-4'>Basic Calendar</h2>
          <Calendar
            selectedDate={singleDate}
            paymentDueDate={paymentDueDate}
            onSelectDate={(date) => setSingleDate(date)}
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
              {singleDate
                ? `Selected date: ${singleDate.toLocaleDateString()}`
                : 'Select a payment date'}
            </Calendar.Messaging>
          </Calendar>
        </div>

        {/* Custom Composable Calendar */}
        <div className='max-w-md mx-auto'>
          <h2 className='text-xl font-bold mb-4'>Custom Composable Calendar</h2>
          <Calendar
            selectedDate={singleDate}
            paymentDueDate={paymentDueDate}
            onSelectDate={(date) => setSingleDate(date)}
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
                disabled={!singleDate}
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
            selectedDate={singleDate}
            onSelectDate={(date) => setSingleDate(date)}
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
}

export default App;
