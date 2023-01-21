import { useState, useContext } from "react";
import Home from "../home/Home";
import Pomodoro from "../pomodoro/Pomodoro";
import Hangman from "../hangman/Hangman";
import { parseRoute } from "../../lib/parse-route";
import AppContext from "../../lib/app-context";

const Navbar = () => {
  const info = useContext(AppContext);
  const [path, setPath] = useState("home");

  const active = "nav-item nav-link active";
  const notActive = "nav-item nav-link";

  const setPage = (e) => {
    const currentPath = e.target.name;
    if (currentPath === "sign-out") {
      window.location.hash = "";
      setPath("");
      parseRoute(window.location.hash);
      info.handleSignOut();
    } else {
      window.location.hash = currentPath;
      setPath(currentPath);
      parseRoute(window.location.hash);
    }
  };

  return (
    <>
      <div className="container">
        <nav className="nav justify-content-center nav-tabs">
          <button
            style={{ border: "none" }}
            onClick={setPage}
            name="home"
            className={path === "home" ? active : notActive}
          >
            Home
          </button>
          <button
            style={{ border: "none" }}
            onClick={setPage}
            name="pomodoro"
            className={path === "pomodoro" ? active : notActive}
          >
            Pomodoro
          </button>
          <button
            style={{ border: "none" }}
            onClick={setPage}
            name="hangman"
            className={path === "hangman" ? active : notActive}
          >
            Hangman
          </button>
          <button
            style={{ border: "none" }}
            onClick={setPage}
            name="sign-out"
            className={path === "sign-out" ? active : notActive}
          >
            Sign Out
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
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Navbar;
