import Navbar from "./components/navbar/Navbar";
import Auth from "./components/auth/Auth";
import { useState } from "react";
import AppContext from "./lib/app-context";

function App() {
  const [user, setUser] = useState(false);

  // const getUser = () => {

  // }

  return (
    <>
      <AppContext.Provider value={setUser}>
        <div style={{ marginTop: "50px" }}>{!user ? <Auth /> : <Navbar />}</div>
      </AppContext.Provider>
    </>
  );
}

export default App;
