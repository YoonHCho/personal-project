import { useState, useEffect } from "react";
import AppContext from "../../lib/app-context";
import "./auth.css";
import Form from "./Form";

const Auth = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, SetIsDeleting] = useState(false);
  const toRotate = [
    "I'm a Full-Stack Engineer.",
    "Welcome to My Project.",
    "Hope You Enjoy!",
  ];
  const [text, setText] = useState(" ");
  const [delta, setDelta] = useState(150);
  const [haveAcct, setHaveAcct] = useState(false);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      SetIsDeleting(true);
      setDelta(300);
    } else if (isDeleting && updatedText === "") {
      SetIsDeleting(false);
      setLoopNum((prevNum) => prevNum + 1);
      setDelta(150);
    }
  };

  // UNCOMMENT ONCE FORM IS COMPLETED!!**********
  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <AppContext.Provider value={{ haveAcct, setHaveAcct }}>
      <section className="banner" id="home">
        <div className="container font-monospace text-center">
          <div className="row justify-content-center align-items-center text-center">
            <h1 className="text-center">Project Molla</h1>
            <h2
            // style={text.length > 1 ? { height: "71.98px" } : {}}
            >{`Hello world, my name is Yoon.`}</h2>
            <h3>
              &nbsp;
              <span>{text}</span>
            </h3>
            <p>Please sign in to use couple of small applications.</p>
            <ul>
              <li>Pomodoro</li>
              <li>Hangman&nbsp;</li>
              <li>Messages</li>
            </ul>
            If you haven't registered yet, please sign up
            <p>{`(You do not need to use an actual email)`}</p>
          </div>
        </div>
        <div className="sign">
          <Form />
        </div>
      </section>
    </AppContext.Provider>
  );
};

export default Auth;
