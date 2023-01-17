import { useState } from "react";
import Home from "../home/Home";
import Pomodoro from "../pomodoro/Pomodoro";
import Hangman from "../hangman/Hangman";
import Message from "../message/Message";
import { parseRoute } from "../../lib/parse-route";
// import Test from "../Test";

const Navbar = () => {
  const [path, setPath] = useState("home");

  const active = "nav-item nav-link active";
  const notActive = "nav-item nav-link";

  const setPage = (e) => {
    const currentPath = e.target.name;
    window.location.hash = currentPath;
    setPath(currentPath);
    parseRoute(window.location.hash);
  };

  return (
    <>
      <div className="container">
        <nav className="nav justify-content-center nav-tabs">
          <button
            style={{ border: "none" }}
            onClick={setPage}
            name="home"
            // className="nav-item nav-link"
            className={path === "home" ? active : notActive}
          >
            Home
            {/* <a href="home" className="nav-item nav-link" name="home">
              Home
            </a> */}
          </button>
          <button
            style={{ border: "none" }}
            onClick={setPage}
            name="pomodoro"
            // className="nav-item nav-link"
            className={path === "pomodoro" ? active : notActive}
          >
            Pomodoro
            {/* <a
              href="pomodoro"
              className="nav-item nav-link active"
              name="pomodoro"
            >
              Pomodoro
            </a> */}
          </button>
          <button
            style={{ border: "none" }}
            onClick={setPage}
            name="hangman"
            // className="nav-item nav-link"
            className={path === "hangman" ? active : notActive}
          >
            Hangman
            {/* <a href="hangman" className="nav-item nav-link" name="hangman">
              Hangman
            </a> */}
          </button>
          <button
            style={{ border: "none" }}
            onClick={setPage}
            name="messages"
            // className="nav-item nav-link"
            className={path === "messages" ? active : notActive}
          >
            Messages
            {/* <a href="messages" className="nav-item nav-link" name="messages">
              Messages
            </a> */}
          </button>
        </nav>
      </div>
      <div style={{ marginTop: "15px" }}>
        {path === "home" ? (
          <Home />
        ) : path === "pomodoro" ? (
          <Pomodoro />
        ) : path === "hangman" ? (
          <Hangman />
        ) : path === "messages" ? (
          <Message />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Navbar;
