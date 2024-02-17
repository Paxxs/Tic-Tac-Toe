import "./styles.css";
import { useState } from "react";

interface squareProps {
  value: string;
  onSquareClick: () => void;
}

function Square({ value, onSquareClick }: squareProps) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

interface BoardProps {
  squares: string[];
  onUpdateGame: (nextSquare: Array<string>) => void;
}

function Board({ squares, onUpdateGame }: BoardProps) {
  // const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true); // 默认第一次下的是X
  const winner = checkWinner(squares);
  let prompt: string;
  if (winner) {
    prompt = "😀 恭喜玩家 " + winner + " 赢了！";
  } else {
    prompt = "😜 下一个玩家：" + (xIsNext ? "X" : "O");
  }
  const handleClick = (i: number) => {
    if (squares[i] || winner) {
      if (winner) {
        //赢了如果再点击提示重来。
        if (window.confirm("赢家已经胜出，是否重新开始？"))
          onUpdateGame(Array(9).fill(null));
      }
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    onUpdateGame(newSquares);
    setXIsNext(!xIsNext);
  };
  return (
    <>
      <div className="App">
        <p>{prompt}</p>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </>
  );
}

function Game() {
  const [gameHistory, setHistory] = useState([Array(9).fill(null)]); // 储存游戏历史数据
  const currentSquares: string[] = gameHistory[gameHistory.length - 1];

  const updateGameData = (nextSquare: Array<string>) => {
    setHistory([...gameHistory, nextSquare]);
    console.log(gameHistory);
  };
  return (
    <>
      <div className="game">
        <div>
          <Board squares={currentSquares} onUpdateGame={updateGameData} />
        </div>
        <div className="game-info">
          <ol> todo </ol>
        </div>
      </div>
    </>
  );
}

export default Game;

function checkWinner(squares: Array<string>): string | null {
  const checkLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < checkLines.length; i++) {
    const [a, b, c] = checkLines[i];
    if (squares[a] && squares[a] == squares[b] && squares[b] == squares[c])
      return squares[a];
  }
  return null;
}
