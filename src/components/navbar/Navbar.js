// import { useState } from 'react';
import Hangman from "../hangman/Hangman";
import Pomodoro from "../pomodoro/Pomodoro";
import Message from "../message/Message";
// import Test from "../Test";

const Navbar = () => {
  return (
    <div className="container">
      <nav className="nav justify-content-center nav-tabs">
        <a
          href="hangman"
          className="nav-item nav-link"
          name="hangman"
        >
          Hangman
        </a>
        <a
          href="pomodoro"
          className="nav-item nav-link active"
          name="pomodoro"
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

      <Hangman />
      <Pomodoro />
      <Message />
    </div>
  );
};

export default Navbar;
