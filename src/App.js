import Navbar from "./components/navbar/Navbar";
import Auth from "./components/auth/Auth";
import { useState } from "react";
import AppContext from "./lib/app-context";
import axios from "./api/axios";
// import { PageContainer } from "./components/auth/page-container";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [totalvisits, setTotalVisits] = useState(0);

  const TOTAL_URL = "/total";
  // const [currentUser, setCurrentUser] = useState({
  //   userid: 1,
  //   username: "Yoon",
  // });
  // const [path, setPath] = useState("");

  // useEffect(() => {
  //   window.addEventListener("hashchange", () => {
  //     setPath(parseRoute(window.location.hash));
  //   });
  //   console.log("path: ", path);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   const getTotalVisits = async () => {
  //     try {
  //       let total = await axios.get(TOTAL_URL);
  //       setTotalVisits(total.data + 1);
  //       const updateTotal = async () => {
  //         try {
  //           await axios.put(`${TOTAL_URL}/${total}`);
  //         } catch (err) {
  //           console.log("Something went wrong with update total", err);
  //         }
  //       };
  //       updateTotal();
  //     } catch (err) {
  //       console.log("CANNOT GET TOTAL VISIT", err);
  //     }
  //   };

  //   getTotalVisits();
  // }, []);

  const onSignIn = (response) => {
    const { user, token } = response;
    window.localStorage.setItem("react-context-jwt", token);
    setCurrentUser(user);

    const getTotalVisits = async () => {
      try {
        const total = await axios.get(TOTAL_URL);
        const totVisit = total.data.totalvisits + 1;
        setTotalVisits(totVisit);
        const updateTotal = async () => {
          try {
            await axios.put(`${TOTAL_URL}/${totVisit}`);
          } catch (err) {
            console.log("Something went wrong with update total", err);
          }
        };
        updateTotal();
      } catch (err) {
        console.log("CANNOT GET TOTAL VISIT", err);
      }
    };

    getTotalVisits();
    // window.location.hash = "home";
  };

  const handleSignOut = () => {
    window.localStorage.removeItem("react-context-jwt");
    setCurrentUser(null);
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
      <AppContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          onSignIn,
          handleSignOut,
          totalvisits,
        }}
      >
        <div style={{ marginTop: "50px" }}>
          {/* <PageContainer>{renderPage()}</PageContainer> */}
          {!currentUser ? <Auth /> : <Navbar />}
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
