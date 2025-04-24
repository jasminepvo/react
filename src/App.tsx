// import { Counter } from "./components/Counter";
// import { Hangman } from "./components/Hangman";
// import { TicTacToe } from "./components/TicTacToe";
import { DatePicker } from "./components/DatePicker";
const date = new Date();


function App() {
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
      <DatePicker label="Payment Date" placeholder="MM/DD/YYYY" disclaimer="In order for your payment to be credited today, please select today's date as the payment date and submit your payment before 11:59 PM EST. Please note that payments received after 11:59 PM EST will be credited the next business day." />
    </div>
  );
}

export default App;
