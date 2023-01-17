import React, { Fragment } from "react";
import { useState, useEffect, useRef, useReducer } from "react";
import { alphabet, drawHangman } from "../../container/draw-letter";
import axios from "axios";

const Hangman = () => {
  const [wrong, setWrong] = useState(0);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [solved, setSolved] = useState(false);
  const [finished, setFinished] = useState(false);
  const [word, setWord] = useState("");
  const canvasRef = useRef(null);
  const [reducerVal, forceUpdate] = useReducer((x) => x + 1, 0);

  const wordArray = word.toUpperCase().split("");
  const wordArrayNoSpace = wordArray.filter((ele) => ele !== " ");

  useEffect(() => {
    drawHangman(canvasRef, wrong);
  }, [wrong]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "https://api.api-ninjas.com/v1/randomword",
        {
          headers: { "X-Api-Key": process.env.REACT_APP_RANDOM_WORD_API },
        }
      );
      const theWord = data.word;
      setWord(theWord);
    })();
  }, [reducerVal]);

  useEffect(() => {
    const toCheck = (currentEle) => correctLetters.includes(currentEle);
    const solvedOrNot =
      wordArrayNoSpace.every(toCheck) && correctLetters.length > 0;
    if (solvedOrNot) {
      setSolved(solvedOrNot);
    }
  }, [correctLetters, wordArrayNoSpace]);

  const clickedButton = (e) => {
    if (wrong >= 7 || solved) {
      return null;
    }

    if (e.target.nodeName === "BUTTON") {
      const selectedLetter = e.target.innerText;
      // if the clicked letter is included in the word
      if (wordArray.includes(selectedLetter)) {
        // check if the clicked letter is included in the correctLetters array
        // if it is not in the correctLetters array, push the letter to the array
        if (!correctLetters.includes(selectedLetter)) {
          setCorrectLetters((prev) => {
            const toSet = prev.concat(selectedLetter);
            return toSet;
          });
        }
        setWrong((prev) => prev + 0);
        // if the clicked letter is NOT included in the word
      } else {
        // check if the clicked letter is included in the wrongLetters array
        // if it is not included, push the letter to the wrongLetters array
        if (!wrongLetters.includes(selectedLetter)) {
          setWrongLetters((prev) => {
            const toSet = prev.concat(selectedLetter);
            return toSet;
          });

          if (wrong >= 6) {
            setWrong((prev) => prev + 1);
            setFinished(true);
            return null;
          }

          setWrong((prev) => prev + 1);
        }
      }
    }
  };

  const playAgain = () => {
    // window.location.reload(true);
    setWrong(0);
    setCorrectLetters([]);
    setWrongLetters([]);
    setSolved(false);
    setFinished(false);
    setWord("");
    forceUpdate();
  };

  return (
    <>
      <div className="container font-monospace">
        <div className="row justify-content-md-center align-items-center">
          <div className="col-md-6 row justify-content-md-center">
            <canvas ref={canvasRef} />
          </div>
          <div className="col-md-6 flex-nowrap">
            <h1 className="text-center my-3">
              {wordArray.map((letter, index) => {
                if (letter === " ") {
                  return (
                    <span key={index}>
                      <br />
                    </span>
                  );
                } else {
                  if (correctLetters.includes(letter)) {
                    return <span key={index}> {letter}</span>;
                  } else {
                    return <span key={index}> _</span>;
                  }
                }
              })}
            </h1>
            <div className="text-center my-3" onClick={clickedButton}>
              {alphabet.map((each) => {
                if (each === "P" || each === "L") {
                  return (
                    <Fragment key={each}>
                      <button
                        className={
                          correctLetters.includes(each)
                            ? "bg-success fs-1 mx-1 my-1"
                            : wrongLetters.includes(each)
                            ? "bg-danger fs-1 mx-1 my-1"
                            : "bg-secondary fs-1 mx-1 my-1"
                        }
                      >
                        {each}
                      </button>
                      <br />
                    </Fragment>
                  );
                }
                return (
                  <Fragment key={each}>
                    <button
                      className={
                        correctLetters.includes(each)
                          ? "bg-success fs-1 mx-1 my-1"
                          : wrongLetters.includes(each)
                          ? "bg-danger fs-1 mx-1 my-1"
                          : "bg-secondary fs-1 mx-1 my-1"
                      }
                    >
                      {each}
                    </button>
                  </Fragment>
                );
              })}
            </div>
            {solved || finished ? (
              <>
                <h3 className="text-center">Play Again?</h3>
                <div className="text-center">
                  <button
                    className="bg-info"
                    onClick={playAgain}
                    style={{ width: "75px" }}
                  >
                    New Game
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hangman;
