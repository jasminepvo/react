import { Counter } from "./components/Counter";

function App() {
  return (
    <div className="p-10">
      <span className="font-italiana text-5xl lg:text-7xl italic">React</span>
      <span className="text-5xl lg:text-7xl font-thin"> Components</span>
      <hr className="border-t border-gray-300 w-full my-4" />
      <hr className="border-t border-gray-300 w-full my-4" />
      <Counter />
      <hr className="border-t border-gray-300 w-full my-4" />
      <hr className="border-t border-gray-300 w-full my-4" />
    </div>
  );
}

export default App;
