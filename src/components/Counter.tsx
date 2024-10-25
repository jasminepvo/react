import { useState } from "react";
import { ComponentWrapper } from "./ComponentWrapper";

// Move the counterCode outside the handleClick so it's always accessible
const counterCode = `import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <button onClick={handleClick}>
        Likes: {count}
      </button>
    </div>
  );
};
`;

export const Counter = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <ComponentWrapper
      title="Counter Component"
      component={
        <div className="bg-blush hover:bg-brown hover:outline hover:outline-blush hover:text-blush text-brown rounded-lg w-24 h-10 text-center border-brown p-2">
          <button onClick={handleClick}>Likes: {count}</button>
        </div>
      }
      code={counterCode} // Now it's accessible here
    />
  );
};
