import Navbar from "./components/navbar/Navbar";
import Auth from "./components/auth/Auth";
import { useState } from "react";
import AppContext from "./lib/app-context";
// import { PageContainer } from "./components/auth/page-container";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  // const [path, setPath] = useState("");

  // useEffect(() => {
  //   window.addEventListener("hashchange", () => {
  //     setPath(parseRoute(window.location.hash));
  //   });
  //   console.log("path: ", path);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const onSignIn = (response) => {
    const { user, token } = response;
    console.log("user.username: ", user.username);
    console.log("token: ", token);
    window.localStorage.setItem("react-context-jwt", token);
    setCurrentUser(user.username);
    // window.location.hash = "home";
  };

  // const renderPage = () => {
  //   if (path === "home") {
  //     return <Navbar />;
  //   }
  //   if (path === "register" || path === "sign-in" || path === "") {
  //     return <Auth />;
  //   }
  // };

  return (
    <>
      <AppContext.Provider value={{ currentUser, setCurrentUser, onSignIn }}>
        <div style={{ marginTop: "50px" }}>
          {/* <PageContainer>{renderPage()}</PageContainer> */}
          {!currentUser ? <Auth /> : <Navbar />}
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
