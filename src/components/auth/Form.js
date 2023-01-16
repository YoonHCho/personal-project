import AppContext from "../../lib/app-context";
import { useContext, useState } from "react";
import axios from "axios";

const Form = () => {
  const settingsInfo = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [taken, setTaken] = useState(false);

  const signInOrUp = settingsInfo.haveAcct ? `Sign In` : `Sign Up`;
  const account = settingsInfo.haveAcct
    ? `Please Sign In`
    : `Create an account`;
  const toggle = settingsInfo.haveAcct
    ? `Don't have an accout? `
    : `Already registered? `;
  const logRegister = settingsInfo.haveAcct ? `Register` : `Log In`;

  const handleLogIn = (e) => {
    e.preventDefault();
    console.log(e);
    console.log("THIS IS HANDLE Log In");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (taken) {
      setTaken(false);
    }

    axios
      .post("/", {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((response) => {
        console.log("RESPONSE:", response.data);
      })
      .catch((err) => {
        setTaken(true);
        console.error(err);
        console.log(err);
      });

    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <h1>{signInOrUp}</h1>
      <p>{account}</p>
      <p>
        {toggle}
        <button
          className="btn-link"
          onClick={() => settingsInfo.setHaveAcct(!settingsInfo.haveAcct)}
        >
          {logRegister}
        </button>
      </p>
      <form onSubmit={settingsInfo.haveAcct ? handleLogIn : handleRegister}>
        <div>
          <label htmlFor="username">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        {settingsInfo.haveAcct ? (
          ""
        ) : (
          <div>
            <label htmlFor="email">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
        )}
        <div>
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button className="sign-button">
          {!settingsInfo.haveAcct ? `Register` : `Log In`}
        </button>
      </form>
      {taken ? (
        <p style={{ marginTop: "15px" }}>
          Username is already taken, Please try again with different username
        </p>
      ) : (
        ""
      )}
    </>
  );
};

export default Form;
