import { useState } from 'react'

function Square({ value, onSquareClick }) {
  return (
    <button className='square' onClick={onSquareClick}>{value}</button>
  )
}

 function Board({xIsNext, squares, onPlay}) {

  function handleClick(i) {
    if (squares[i] || calculationWinner(squares)) return;
    const nextSquares = squares.slice();

    nextSquares[i] = xIsNext ? 'X' : 'O';
    //Program Ternary diatas Sama seperti Program Di Bawah 
    /*
    if(xIsNext) {
      nextSquares[i] = 'X';
    }else {
      nextSquares[i] = 'O';
    }
    */
    
    onPlay(nextSquares);
  }

  const winner = calculationWinner(squares);
  let status = '';
  if (winner) {
    status = 'Winner: ' + winner;
  }else {
    status = 'Next Player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div>
        <h1>{status}</h1> 
      </div>
      <div className='board'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>

  );
}

export default function Game() {
const [history, setHistory] = useState ([Array(9).fill(null)]);
const [curentMove, setCurentMove] = useState(0);
const xIsNext = curentMove % 2 === 0;
const curentSquares = history[curentMove];

function jumpTo(nextMove) {
  setCurentMove(nextMove);
}

function handlePlay(nextSquares) {
  const nextHistory = [...history.slice(0, curentMove + 1), nextSquares];

  setHistory(nextHistory);
  setCurentMove(nextHistory.length - 1);
}

const moves = history.map((squares, move) => {
  let description = '';
  if (move > 0){
    description = 'Go to Move #' + move;
  }else {
    description= 'Go to game Start';
  }

  return (
    <li>
      <button onClick={() => jumpTo(move)}>{description}</button>
    </li>
  )
});

  return(
    <>
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={curentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
    </>
  )
}

function calculationWinner(squares) {
  const line = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < line.length; i++) {
    const [a, b, c] = line[i];

    if (squares[a] && squares[a] === squares[b] && squares[c]) {
      return squares[a];
    }
  }

  return false;
}
