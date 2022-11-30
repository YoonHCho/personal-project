import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { alphabet, drawHangman } from '../container/draw-letter';

const testWord = 'hello world';

const Hangman = () => {
  const [ wrong, setWrong ] = useState(0);
  const [ correctLetters, setCorrectLetters ] = useState([]);
  const [ wrongLetters, setWrongLetters ] = useState([]);
  const canvasRef = useRef(null);

  const wordArray = testWord.toUpperCase().split('');

  useEffect(() => {
    drawHangman(canvasRef, wrong);
  }, [wrong]);

  const clickedButton = e => {
    if(e.target.nodeName === 'BUTTON') {
      const selectedLetter = e.target.innerText;
      // if the clicked letter is included in the word
      if (wordArray.includes(selectedLetter)) {
        // check if the clicked letter is included in the correctLetters array
        // if it is not in the correctLetters array, push the letter to the array
        if (!correctLetters.includes(selectedLetter)) {
          setCorrectLetters(prev => {
            const toSet = prev.concat(selectedLetter);
            return toSet;
          })
        }
        setWrong(prev => prev + 0);
      // if the clicked letter is NOT included in the word
      } else {
        // check if the clicked letter is included in the wrongLetters array
        // if it is not included, push the letter to the wrongLetters array
        if (!(wrongLetters.includes(selectedLetter))) {
          setWrongLetters(prev => {
            const toSet = prev.concat(selectedLetter);
            return toSet;
          });

          if (wrong >= 6) {
            setWrong(prev => prev + 1);
            return console.log('END OF GAME!')
          }

          setWrong(prev => prev + 1);
        }
      }

    }
  }

  return (
    <div className="container font-monospace">
      {console.log('RENDERED')}
      <div className='row justify-content-md-center'>
        <div className='col-md-6 row justify-content-md-center'>
          <canvas ref={canvasRef} />
        </div>
        <div className='col-md-6 align-items-center flex-nowrap'>
          <h1 className='text-center my-3'>
          {
            wordArray.map(letter => {
              if (letter === ' ') {
                return (
                  <br />
                );
              } else {
                if (correctLetters.includes(letter)) {
                  return ` ${letter}`;
                } else {
                  return ' _';
                }
              }
            })
          }
          </h1>
          <div className='text-center my-3'
            onClick={clickedButton}
          >
            {
              alphabet.map(each => {
                if (each === 'P' || each === 'L') {
                  return (
                    <>
                      <button key={each}
                        className={
                          correctLetters.includes(each) ? 'bg-success fs-1 mx-1 my-1'
                          : (wrongLetters.includes(each) ? 'bg-danger fs-1 mx-1 my-1' : 'bg-secondary fs-1 mx-1 my-1')
                        }
                      >{each}</button>
                      <br />
                    </>
                  );
                }
                return (
                  <>
                    <button key={each}
                      className={
                            correctLetters.includes(each) ? 'bg-success fs-1 mx-1 my-1'
                            : (wrongLetters.includes(each) ? 'bg-danger fs-1 mx-1 my-1' : 'bg-secondary fs-1 mx-1 my-1')
                          }
                    >{each}</button>
                  </>
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hangman;