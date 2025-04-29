// import { Counter } from "./components/Counter";
// import { Hangman } from "./components/Hangman";
// import { TicTacToe } from "./components/TicTacToe";
import { useState } from "react";
import {
  DatePickerSingle,
  DatePickerMultiple,
  DatePickerRange,
} from "./components/DatePicker";
import { DateRange } from "react-day-picker";

export default function App() {
  const [singleDate, setSingleDate] = useState<Date | null>(null);
  const [multipleDates, setMultipleDates] = useState<Date[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  // For demonstration, we'll set a default due date 7 days from now
  const paymentDueDate = new Date();
  paymentDueDate.setDate(paymentDueDate.getDate() + 7);

  // For the Single Date Picker, add minDate and maxDate props to demonstrate the range constraint
  // Set minDate to 7 days ago and maxDate to 30 days from now
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);
  const thirtyDaysFromNow = new Date(today);
  thirtyDaysFromNow.setDate(today.getDate() + 30);

  const handleSingleDateChange = (date: Date | null) => {
    setSingleDate(date);
  };

  const handleMultipleDatesChange = (dates: Date[]) => {
    setMultipleDates(dates);
  };

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
  };

  return (
    <div className="p-10">
      <span className="font-italiana text-5xl lg:text-7xl italic">React</span>
      <span className="text-5xl lg:text-7xl font-thin"> Components</span>
      {/* <hr className="border-t border-gray-300 w-full my-4" />
      <hr className="border-t border-gray-300 w-full my-4" />
      <Counter />
      <hr className="border-t border-gray-300 w-full my-4" />
      <hr className="border-t border-gray-300 w-full my-4" />
      <Hangman />
      <hr className="border-t border-gray-300 w-full my-4" />
      <hr className="border-t border-gray-300 w-full my-4" />
      <TicTacToe /> */}
      <hr className="border-t border-gray-300 w-full my-4" />
      <hr className="border-t border-gray-300 w-full my-4" />

      <h2 className="text-2xl font-bold text-brown mb-4">Single Date Picker</h2>
      <DatePickerSingle
        value={singleDate}
        onChange={handleSingleDateChange}
        label="Payment Date"
        placeholder="MM/DD/YYYY"
        disclaimer="In order for your payment to be credited today, please select today's date as the payment date and submit your payment before 11:59 PM EST."
        paymentDueDate={new Date(2025, 3, 10)}
        minDate={new Date(2025, 0, 1)}
        maxDate={new Date(2025, 11, 31)}
        errorMessage="Please select a date within the current year"
        required={false}
      />
      <hr className="border-t border-gray-300 w-full my-4" />
      <hr className="border-t border-gray-300 w-full my-4" />
      <h2 className="text-2xl font-bold text-brown mb-4">
        Multiple Date Picker
      </h2>
      <DatePickerMultiple
        value={multipleDates}
        onChange={handleMultipleDatesChange}
        label="Select Multiple Dates"
        placeholder="Select dates"
        disclaimer="Select all the dates you want to include."
        maxDates={5}
      />
      <hr className="border-t border-gray-300 w-full my-4" />
      <hr className="border-t border-gray-300 w-full my-4" />

      <h2 className="text-2xl font-bold text-brown mb-4">Date Range Picker</h2>
      <DatePickerRange
        value={dateRange}
        onChange={handleDateRangeChange}
        label="Select Date Range"
        placeholder="Select date range"
        disclaimer="Select the start and end dates for your date range."
        minRange={2}
        maxRange={30}
      />
      <hr className="border-t border-gray-300 w-full my-4" />
      <hr className="border-t border-gray-300 w-full my-4" />
    </div>
  );
}
