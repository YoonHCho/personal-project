import Navbar from "./components/navbar/Navbar";
import Auth from "./components/auth/Auth";
import { useState } from "react";
import AppContext from "./lib/app-context";
import axios from "./api/axios";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [totalvisits, setTotalVisits] = useState(0);
  const [todayvisits, setTodayVisits] = useState(0);
  const TOTAL_URL = "/total";
  const TODAY_URL = "/today";
  const DATE_URL = "/today/date";

  const onSignIn = (response) => {
    const { user, token } = response;
    window.localStorage.setItem("react-context-jwt", token);
    setCurrentUser(user);

    const getTotalVisits = async () => {
      try {
        const total = await axios.get(TOTAL_URL);
        const totVisit = total.data.totalvisits + 1;
        setTotalVisits(totVisit);

        const dataDate = total.data.currentdate;

        const date = new Date();
        const dateToComp = date.toString().substring(4, 15).replaceAll(" ", "");
        if (dataDate === dateToComp) {
          const todayVis = total.data.todayvisits + 1;
          setTodayVisits(todayVis);
          try {
            const updateToday = async () => {
              await axios.put(`${TODAY_URL}/${todayVis}`);
            };
            updateToday();
          } catch (err) {
            console.log("Something went wrong with update total", err);
          }
        } else if (dataDate !== dateToComp) {
          const todayVis = 1;
          setTodayVisits(todayVis);
          try {
            const updateDate = async () => {
              await axios.put(
                `${DATE_URL}/${todayVis}`,
                JSON.stringify({ currentdate: dateToComp }),
                {
                  headers: { "Content-Type": "application/json" },
                  withCredentials: true,
                }
              );
            };
            updateDate();
          } catch (err) {
            // error
          }
        }
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
  };

  const handleSignOut = () => {
    window.localStorage.removeItem("react-context-jwt");
    setCurrentUser(null);
  };

  return (
    <>
      <AppContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          onSignIn,
          handleSignOut,
          totalvisits,
          todayvisits,
        }}
      >
        <div style={{ marginTop: "50px" }}>
          {!currentUser ? <Auth /> : <Navbar />}
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
