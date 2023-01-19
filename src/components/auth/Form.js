import AppContext from "../../lib/app-context";
import { useContext, useState } from "react";
import axios from "../../api/axios";

const Form = () => {
  const settingsInfo = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [taken, setTaken] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const REGISTER_URL = "/register";
  const SIGN_IN_URL = "/sign-in";

  const signInOrUp = settingsInfo.haveAcct ? `Sign In` : `Sign Up`;
  const account = settingsInfo.haveAcct
    ? `Please Sign In`
    : `Create an account`;
  const toggle = settingsInfo.haveAcct
    ? `Don't have an accout? `
    : `Already registered? `;
  const logRegister = settingsInfo.haveAcct ? `Register` : `Log In`;

  const handleLogIn = async (e) => {
    e.preventDefault();
    if (loginError) {
      setLoginError(false);
    }

    try {
      const response = await axios.post(
        SIGN_IN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.user.username && response.data.token) {
        settingsInfo.onSignIn(response.data);
      }
    } catch (err) {
      setLoginError(true);
      console.error("console.error: ", err);
      console.log("console.log:", err);
    }

    setUsername("");
    setPassword("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (taken) {
      setTaken(false);
    }

    // setUsername(e.target.username.value);
    // setEmail(e.target.email.value);
    // setPassword(e.target.password.value);

    // username: e.target.username.value, email: e.target.email.value, password: e.target.password.value

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username, email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      settingsInfo.setHaveAcct(true);
      console.log(response);
    } catch (err) {
      setTaken(true);
      console.error(err);
      console.log(err);
    }

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
          onClick={() => {
            settingsInfo.setHaveAcct(!settingsInfo.haveAcct);
            if (taken) {
              setTaken(false);
            } else if (loginError) {
              setLoginError(false);
            }
          }}
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
          Username taken. Try with different username.
        </p>
      ) : (
        ""
      )}
      {loginError ? (
        <p style={{ marginTop: "15px" }}>
          Log-in error, please check username/password.
        </p>
      ) : (
        ""
      )}
    </>
  );
};

export default Form;
