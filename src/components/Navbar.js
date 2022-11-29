import { useState } from 'react';
import Hangman from './Hangman';
import Test from './Test';

const Navbar = () => {
  const [ page, setPage ] = useState('home');

  const navSelect = (e) => {
    e.preventDefault();
    console.log(e.target.name);
    setPage(e.target.name);
  }

  return (
    <div className="container">
      <nav className="nav justify-content-center nav-tabs">
          <a href="/" className="nav-item nav-link active" name="hangman" onClick={navSelect}>Hangman</a>
          <a href="/" className="nav-item nav-link" name="profile" onClick={navSelect}>Profile</a>
          <a href="/" className="nav-item nav-link" name="message" onClick={navSelect}>Messages</a>
          <a href="/" className="nav-item nav-link" name="reports" onClick={navSelect}>Reports</a>
      </nav>
      {
        page === 'home'
        ? <Hangman />
        : <Test />
      }
    </div>
  );
};

export default Navbar;