import { useState } from "react";

type SquareType = "X" | "O" | null;

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const calculateWinner = (squares: SquareType[]): SquareType => {
  for (const [a, b, c] of winCombos) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export const TicTacToe = () => {
  const [squares, setSquares] = useState<SquareType[]>(Array(9).fill(null));
  const [isXNext, setisXNext] = useState<boolean>(true);

  const winner = calculateWinner(squares);

  const Square = (i: number) => (
    <button
      style={{
        width: "50px",
        height: "50px",
        border: "2px solid #999",
        margin: "5px",
        fontSize: "24px",
        fontWeight: "bold",
      }}
      onClick={() => handleClick(i)}
    >
      {squares[i]}
    </button>
  );

  const handleClick = (i: number) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const newSquares = squares.slice(0);
    newSquares[i] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setisXNext(!isXNext);
  };

  //show status
  const status = winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? "Draw"
    : `Next Player: ${isXNext ? "X" : "O"}`;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: "24px",
        }}
      >
        {status}
      </div>
      <div style={{ display: "flex" }}>
        {Square(0)}
        {Square(1)}
        {Square(2)}
      </div>
      <div style={{ display: "flex" }}>
        {Square(3)}
        {Square(4)}
        {Square(5)}
      </div>
      <div style={{ display: "flex" }}>
        {Square(6)}
        {Square(7)}
        {Square(8)}
      </div>
    </div>
  );
};
