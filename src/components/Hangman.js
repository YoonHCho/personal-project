import React from 'react';
import { useState, useEffect, useRef } from 'react';

const letters = 'qwertyuiopasdfghjklzxcvbnm';
const testWord = 'molla';

// const canvas = React.createElement('canvas');

// 
// c.lineWidth = 5;

const Hangman = () => {
  const [ wrong, setWrong ] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 270;
    canvas.height = 400;
    const context = canvas.getContext('2d');
    context.lineWidth = 2;

    if (wrong >= 0) {
      context.beginPath();
      context.moveTo(10, 375);
      context.lineTo(260, 375);
      context.moveTo(60, 375);
      context.lineTo(60, 50);
      context.lineTo(150, 50);
      context.moveTo(149, 50);
      context.lineTo(149, 80);
      context.moveTo(60, 80)
      context.lineTo(90 ,50)
      context.closePath();
      context.stroke();
    }
    if (wrong >= 1) {
      context.beginPath();
      context.arc(147, 110, 30, 20, 40 * Math.PI);
      context.closePath();
      context.stroke();
    }
    if (wrong >= 2) {
      context.beginPath();
      context.moveTo(147, 140);
      context.lineTo(147, 220);
      context.closePath();
      context.stroke();
    }
    if (wrong >= 3) {
      context.beginPath();
      context.moveTo(147, 141);
      context.lineTo(187, 186);
      context.closePath();
      context.stroke();
    }
    if (wrong >= 4) {
      context.beginPath();
      context.moveTo(147, 141);
      context.lineTo(107, 190);
      context.closePath();
      context.stroke();
    }
    if (wrong >= 5) {
      context.beginPath();
      context.moveTo(147, 220);
      context.lineTo(187, 300);
      context.closePath();
      context.stroke();
    }
    if (wrong >= 6) {
      context.beginPath();
      context.moveTo(147, 220);
      context.lineTo(107, 300);
      context.closePath();
      context.stroke();
    }
    if (wrong >= 7) {
      context.beginPath();
      context.arc(147, 110, 30, 20, 40 * Math.PI);
      context.fillStyle = 'red';
      context.fill()
      context.closePath();
      context.stroke();
    }
  })

  return (
    <div className="container">
      <canvas ref={canvasRef} />
      <div className='bg-dark text-white'>
        <h1 className='font-monospace text-center'>
        {
          [...testWord].map(letter => {
            if (letter === ' ') {
              return '\xa0\xa0\xa0\xa0';
            } else {
              return '__ ';
            }
          })
        }
        </h1>
      </div>

    </div>
  );
};

export default Hangman;