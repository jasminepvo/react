// import { Counter } from "./components/Counter";
// import { Hangman } from "./components/Hangman";
// import { TicTacToe } from "./components/TicTacToe";
import { useState } from "react";
import { DatePicker } from "./components/DatePicker";
import { DateRange } from "react-day-picker";

type AnySelectionValue = Date | Date[] | DateRange | null;

function App() {
  // State for each DatePicker mode
  const [singleDate, setSingleDate] = useState<Date | null>(new Date());
  const [multipleDates, setMultipleDates] = useState<Date[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | null>(null);

  // Type-safe onChange handlers with type assertions
  const handleSingleDateChange = (value: AnySelectionValue) => {
    if (value === null || value instanceof Date) {
      setSingleDate(value);
    }
  };

  const handleMultipleDatesChange = (value: AnySelectionValue) => {
    if (value !== null && Array.isArray(value)) {
      setMultipleDates(value);
    }
  };

  const handleDateRangeChange = (value: AnySelectionValue) => {
    if (value !== null && typeof value === "object" && "from" in value) {
      setDateRange(value);
    }
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
      <DatePicker
        mode="single"
        value={singleDate}
        onChange={handleSingleDateChange}
        label="Payment Date"
        placeholder="MM/DD/YYYY"
        disclaimer="In order for your payment to be credited today, please select today's date as the payment date and submit your payment before 11:59 PM EST."
      />
      <hr className="border-t border-gray-300 w-full my-4" />
      <hr className="border-t border-gray-300 w-full my-4" />
      <h2 className="text-2xl font-bold text-brown mb-4">
        Multiple Date Picker
      </h2>
      <DatePicker
        mode="multiple"
        value={multipleDates}
        onChange={handleMultipleDatesChange}
        label="Select Multiple Dates"
        placeholder="Select dates"
        disclaimer="Select all the dates you want to include."
      />
      <hr className="border-t border-gray-300 w-full my-4" />
      <hr className="border-t border-gray-300 w-full my-4" />

      <h2 className="text-2xl font-bold text-brown mb-4">Date Range Picker</h2>
      <DatePicker
        mode="range"
        value={dateRange}
        onChange={handleDateRangeChange}
        label="Select Date Range"
        placeholder="Select date range"
        disclaimer="Select the start and end dates for your date range."
      />
      <hr className="border-t border-gray-300 w-full my-4" />
      <hr className="border-t border-gray-300 w-full my-4" />

      <div className="mt-8 p-6 bg-cream border border-gray rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Current Selection:</h3>
        <div>
          <strong>Single Date:</strong>{" "}
          {singleDate ? singleDate.toLocaleDateString() : "None"}
        </div>
        <div>
          <strong>Multiple Dates:</strong> {multipleDates.length} dates selected
        </div>
        <div>
          <strong>Date Range:</strong>{" "}
          {dateRange?.from
            ? `${dateRange.from.toLocaleDateString()} - ${
                dateRange.to ? dateRange.to.toLocaleDateString() : "..."
              }`
            : "None"}
        </div>
      </div>
    </div>
  );
}

export default App;
