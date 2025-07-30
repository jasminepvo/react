import { Counter } from './components/Counter';
import { Hangman } from './components/Hangman';
import { TicTacToe } from './components/TicTacToe';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import DatePicker from './components/DatePicker/DatePicker';
import DateField from './components/DateField/DateField';
import { Calendar } from './components/Calendar';

function App() {
  const [singleDate, setSingleDate] = useState<Date | undefined>(new Date());
  const [date, setDate] = useState<Date | undefined>();

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

      <hr className='line' />
      <hr className='line' />

      <Counter />
      <hr className='line' />
      <hr className='line' />

      <Hangman />
      <hr className='line' />
      <hr className='line' />

      <TicTacToe />
      <hr className='line' />
      <hr className='line' />

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

      <hr className='line' />
      <hr className='line' />

      <DateField
        value={date}
        onDateChange={setDate}
        className='border border-gray-200 rounded-lg shadow-sm bg-pink-300 mb-40'
        minDate={new Date('2025-07-01')}
        maxDate={new Date('2025-07-31')}
        format='MM/dd/yyyy'
      >
        <DateField.Label>My Label</DateField.Label>
        <DateField.Input placeholder='mm/dd/yyyy'>
          <DateField.Popover>
            <DateField.Trigger />
            <DateField.PopoverPanel className='w-[200px]'>
              <DateField.Calendar
                className='border border-gray-200 rounded-lg shadow-sm bg-pink-300'
                paymentDueDate={paymentDueDate}
              >
                <Calendar.Heading>
                  <Calendar.Navigation direction='prev' />
                  <Calendar.MonthSelect />
                  <Calendar.YearSelect />
                  <Calendar.Navigation direction='next' />
                </Calendar.Heading>
                <Calendar.Grid outsideDayClassName='bg-blue-100'>
                  <Calendar.GridHeader />
                  <Calendar.GridBody />
                </Calendar.Grid>
                <Calendar.Messaging>
                  Payments scheduled after 11:59 PM EST will be processed the
                  next business day
                </Calendar.Messaging>
                {/* <div className='flex justify-end mt-4'>
                  <Calendar.ActionItemButton>Submit</Calendar.ActionItemButton>
                </div> */}
              </DateField.Calendar>
            </DateField.PopoverPanel>
          </DateField.Popover>
        </DateField.Input>

        <DateField.Error className='mt-2' />
        <DateField.HelpText className='text-green-500'>
          This is a help text
        </DateField.HelpText>
      </DateField>
    </div>
  );
}

export default App;
