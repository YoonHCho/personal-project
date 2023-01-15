import AppContext from "../../lib/app-context";
import { useContext } from "react";

const Form = () => {
  const settingsInfo = useContext(AppContext);
  return (
    <>
      {settingsInfo.haveAcct ? (
        <>
          <h1>Sign In</h1>
          <p>
            Don't have an account?{" "}
            <button
              className="btn-link"
              onClick={() => settingsInfo.setHaveAcct(false)}
            >
              Register
            </button>
          </p>
          <form /*onSubmit={}*/>
            <div>
              <label htmlFor="username">
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                />
              </label>
            </div>
            <div>
              <label htmlFor="password">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
              </label>
            </div>
            <button className="sign-button">Log In</button>
          </form>
        </>
      ) : (
        <>
          <h1>Sign Up</h1>
          <p>Create an account</p>
          <p>
            Already registered?{" "}
            <button
              className="btn-link"
              onClick={() => settingsInfo.setHaveAcct(true)}
            >
              Log In
            </button>
          </p>
          <form /*onSubmit={}*/>
            <div>
              <label htmlFor="username">
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                />
              </label>
            </div>
            <div>
              <label htmlFor="email">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="E-mail"
                />
              </label>
            </div>
            <div>
              <label htmlFor="password">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
              </label>
            </div>
            <button className="sign-button">Register</button>
          </form>
        </>
      )}
    </>
  );
};

export default Form;
