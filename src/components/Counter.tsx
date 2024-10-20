import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <>
      <div className="counterContainer">
        Counter Component
        <button onClick={handleClick}>Likes: {count}</button>
      </div>
    </>
  );
};
