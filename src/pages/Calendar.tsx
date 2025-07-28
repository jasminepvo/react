import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from '../components/Calendar';
import DateField from '../components/DateField/DateField';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const paymentDueDate = new Date();
  paymentDueDate.setDate(paymentDueDate.getDate() + 7);
  const [date, setDate] = useState<Date | undefined>();

  return (
    <div className='p-10'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-4xl font-bold'>Calendar Component</h1>
        <div className='flex gap-4'>
          <Link
            to='/calendar-keyboard-demo'
            className='bg-white text-pink-500 px-6 py-3 rounded-lg hover:bg-pink-600 hover:text-white
                     transition-colors font-medium'
          >
            🎹 Keyboard Demo
          </Link>
          <Link
            to='/'
            className='bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 
                     transition-colors font-medium'
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      <div className='max-w-md mx-auto'>
        {/* Main Calendar */}
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
              <DateField.PopoverPanel>
                <DateField.Calendar
                  className='border border-gray-200 rounded-lg shadow-sm bg-pink-300'
                  paymentDueDate={paymentDueDate}
                  defaultMonth={new Date()}
                >
                  <Calendar.Heading>
                    <Calendar.Navigation direction='prev' />
                    <Calendar.MonthSelect />
                    <Calendar.YearSelect />
                    <Calendar.Navigation direction='next' />
                  </Calendar.Heading>
                  <Calendar.Grid>
                    <Calendar.GridHeader />
                    <Calendar.GridBody />
                  </Calendar.Grid>
                  <Calendar.Messaging>
                    Payments scheduled after 11:59 PM EST will be processed the
                    next business day
                  </Calendar.Messaging>
                  <div className='flex justify-end mt-4'>
                    <Calendar.ActionItemButton>
                      Submit
                    </Calendar.ActionItemButton>
                  </div>
                </DateField.Calendar>
              </DateField.PopoverPanel>
            </DateField.Popover>
          </DateField.Input>

          <DateField.Error className='mt-2' />
          <DateField.HelpText className='text-green-500'>
            This is a help text
          </DateField.HelpText>
        </DateField>
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

          <Calendar.Grid className='p-4' weekStartsOn='monday'>
            <Calendar.GridHeader className='mb-2' weekdayChar='short' />
            <Calendar.GridBody showOutsideDays />
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
          <div className='flex justify-end items-end'>
            <Calendar.ActionItemButton aria-label='Add event'>
              Submit
            </Calendar.ActionItemButton>
          </div>
        </Calendar>
        <p>Selected Date: {selectedDate?.toLocaleDateString()}</p>
      </div>

      {/* Saturday Calendar Example */}
      <div className='max-w-md mx-auto mt-8'>
        <h2 className='text-xl font-bold mb-4'>Saturday Start Calendar</h2>
        <Calendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          className='border rounded p-4 bg-blue-200'
        >
          <Calendar.Heading className='flex items-center justify-between mb-4 bg-blue-500 p-4 rounded-t-lg'>
            <Calendar.Navigation direction='prev' />
            <Calendar.MonthYearSelect />
            <Calendar.Navigation direction='next' />
          </Calendar.Heading>
          <Calendar.Grid weekStartsOn='saturday'>
            <Calendar.GridHeader className='mb-2' weekdayChar='short' />
            <Calendar.GridBody showOutsideDays />
          </Calendar.Grid>
        </Calendar>
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
            <Calendar.MonthSelect optionsBefore={6} optionsAfter={5} />
            <Calendar.YearSelect optionsAfter={10} />
          </Calendar.Heading>
          <Calendar.Grid weekStartsOn='monday'>
            <Calendar.GridHeader className='mb-2' weekdayChar='short' />
            <Calendar.GridBody showOutsideDays={false} />
          </Calendar.Grid>
        </Calendar>
      </div>
    </div>
  );
};

export default CalendarPage;
