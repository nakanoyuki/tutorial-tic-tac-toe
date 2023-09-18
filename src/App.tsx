import { memo, useState } from "react";
import "./App.css";

type SquareProps = {
  value: string;
  // Square コンポーネントが onSquareClick プロパティを受け取る
  onSquareClick: () => void;
};

const Square = ({ value, onSquareClick }: SquareProps) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

// すべてのマスの状態をボードコンポーネントに保持
const Board = () => {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null)); // 長さが9ですべての要素が null で初期化された配列を作成

  const handleClick = (i: number) => {
    if (squares[i]) return;
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    setSquares(nextSquares);
    // プレイヤーが移動するたびに、xIsNext（ブール値）が反転される
    setXIsNext(!xIsNext);
  };
  return (
    <>
      <div className="board-row">
        {/* イベントを表すプロップにはonSomethingという名前を使い、それらのイベントを処理する関数定義にはhandleSomethingを使うのが一般的 */}
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
    </>
  );
};

export default Board;
