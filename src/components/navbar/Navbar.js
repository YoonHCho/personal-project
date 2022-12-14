// import { useState } from 'react';
// import Hangman from "../hangman/Hangman";
import Pomodoro from "../pomodoro/Pomodoro";
import Test from "../Test";

const Navbar = () => {
  return (
    <div className="container">
      <nav className="nav justify-content-center nav-tabs">
        <a
          href="/"
          className="nav-item nav-link"
          name="hangman"
        >
          Hangman
        </a>
        <a
          href="/"
          className="nav-item nav-link active"
          name="profile"
        >
          Pomodoro
        </a>
        <a
          href="/"
          className="nav-item nav-link"
          name="message"
        >
          Messages
        </a>
        <a
          href="/"
          className="nav-item nav-link"
          name="reports"
        >
          Reports
        </a>
      </nav>

      {/* <Hangman /> */}
      <Pomodoro />
      <Test />
    </div>
  );
};

export default Navbar;
