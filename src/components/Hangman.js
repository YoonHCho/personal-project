import React, { Fragment } from 'react';
import { useState, useEffect, useRef } from 'react';
import { alphabet, drawHangman } from '../container/draw-letter';

const testWord = 'hello world';

const Hangman = () => {
  const [ wrong, setWrong ] = useState(0);
  const [ correctLetters, setCorrectLetters ] = useState([]);
  const [ wrongLetters, setWrongLetters ] = useState([]);
  const [ solved, setSolved ] = useState(false);
  const canvasRef = useRef(null);

  const wordArray = testWord.toUpperCase().split('');
  const wordArrayNoSpace = wordArray.filter(ele => ele !== ' ');

  useEffect(() => {
    drawHangman(canvasRef, wrong);
  }, [wrong]);

  useEffect(() => {
    const toCheck = (currentEle) => correctLetters.includes(currentEle);
    const solvedOrNot = wordArrayNoSpace.every(toCheck);
    console.log('solvedOrNot: ', solvedOrNot);
    if (solvedOrNot) {
      setSolved(solvedOrNot);
      console.log('You solved it');
    } else {
      console.log('Still need more letters');
    }
  }, [correctLetters, wordArrayNoSpace]);

  const clickedButton = e => {
    if (wrong >= 7 || solved) {
      return null;
    }
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
    <>
      { solved ? <h1>You got it!</h1> : null }
      <div className="container font-monospace">
        {console.log('RENDERED')}
        <div className='row justify-content-md-center align-items-center'>
          <div className='col-md-6 row justify-content-md-center'>
            <canvas ref={canvasRef} />
          </div>
          <div className='col-md-6 flex-nowrap'>
            <h1 className='text-center my-3'>
            {
              wordArray.map((letter, index) => {
                if (letter === ' ') {
                  return (
                    <span key={index}><br /></span>
                  );
                } else {
                  if (correctLetters.includes(letter)) {
                    return <span key={index}> {letter}</span>;
                  } else {
                    return <span key={index}> _</span>;
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
                      <Fragment  key={each}>
                        <button
                          className={
                            correctLetters.includes(each) ? 'bg-success fs-1 mx-1 my-1'
                            : (wrongLetters.includes(each) ? 'bg-danger fs-1 mx-1 my-1' : 'bg-secondary fs-1 mx-1 my-1')
                          }
                        >{each}</button>
                        <br />
                      </Fragment>
                    );
                  }
                  return (
                    <Fragment key={each}>
                      <button
                        className={
                              correctLetters.includes(each) ? 'bg-success fs-1 mx-1 my-1'
                              : (wrongLetters.includes(each) ? 'bg-danger fs-1 mx-1 my-1' : 'bg-secondary fs-1 mx-1 my-1')
                            }
                      >{each}</button>
                    </Fragment>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hangman;