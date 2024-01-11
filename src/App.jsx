import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      className="bg-white border border-gray-400 m-1 leading-9 text-lg h-12 w-12"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function App({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = `Winner Congraslations : ${winner}`;
  } else {
    status = "Next Player " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    const nextSquare = squares.slice();
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    if (xIsNext) {
      nextSquare[i] = "X";
    } else {
      nextSquare[i] = "O";
    }
    onPlay(nextSquare);
  }

  return (
    <>
      <div>{status}</div>
      <div className="flex">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="flex">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="flex">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setIsXnext] = useState(true);
  const [currentMove, setCuurentMove] = useState(0);
  const currentSquares = history[currentMove];

  function jumpTo(move) {
    setCuurentMove(move);
    setIsXnext(move % 2 === 0);
  }
  function handlePlay(nextSquare) {
    setIsXnext(!xIsNext);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nextHistory);
    setCuurentMove(nextHistory.length - 1);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to the move ${move}`;
    } else {
      description = `Gt o to the start game`;
    }
    return (
      <li
        key={move}
        className=" bg-emerald-500 m-1 border border-gray-300 rounded-sm p-2"
      >
        {<button onClick={() => jumpTo(move)}>{description}</button>}
      </li>
    );
  });

  return (
    <div className="flex justify-center p-2 gap-20">
      <div>
        <App xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="border border-gray-500">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const liens = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < liens.length; i++) {
    const [a, b, c] = liens[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
