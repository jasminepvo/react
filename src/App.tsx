import { Counter } from './components/Counter';
import { Hangman } from './components/Hangman';
import { TicTacToe } from './components/TicTacToe';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import DatePicker from './components/DatePicker/DatePicker';

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
          className='bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors font-medium'
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
    </div>
  );
}

export default App;
