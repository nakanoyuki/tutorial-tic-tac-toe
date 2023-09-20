import { useState } from "react";
import "./App.css";

type SquareProps = {
  value: string | null;
  // Square コンポーネントが onSquareClick プロパティを受け取る
  onSquareClick: () => void;
};

type BoardProps = {
  xIsNext: boolean;
  squares: (string | null)[];

  //引数を受け取るように
  onPlay: (nextSquares: (string | null)[]) => void;
};

const Square = ({ value, onSquareClick }: SquareProps) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

// すべてのマスの状態をボードコンポーネントに保持
export const Board = ({ xIsNext, squares, onPlay }: BoardProps) => {
  const handleClick = (i: number) => {
    // calculateWinnerはsquares 配列に対して勝者がいるかどうかをチェックする関数
    // ゲームに勝者がすでにいる場合、クリックを無視し、何もせずに関数を終了
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
    // setSquares(nextSquares);
    // // プレイヤーが移動するたびに、xIsNext（ブール値）が反転される
    // setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  return (
    <>
      <div className="status">{status}</div>
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

const Game = () => {
  // ゲームの過去の状態（マス目の履歴）を格納
  const [history, setHistory] = useState([Array(9).fill(null)]); // 長さが9ですべての要素が null で初期化された配列を作成
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares: (string | null)[]) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  // ゲームの履歴を選択したときに、選択した履歴のステップに応じてゲームの現在の状態を更新する
  // currentMove を変更し、どちらのプレイヤーが次に手番を持つかを設定
  const jumpTo = (nextMove: number) => {
    setCurrentMove(nextMove);
    // currentMoveを変更する数値が偶数であれば、xIsNextをtrueに設定
  };

  // squares: 盤面の状態を表す (string | null)[] 型の配列
  // move: ステップの番号またはインデックス(ゲームの履歴を表示するために使用)
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;

const calculateWinner = (squares: (string | null)[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a];
  }
  return null;
};
