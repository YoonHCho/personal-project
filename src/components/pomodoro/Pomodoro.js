import { useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import PomodoroSetting from "./PomodoroSetting";
import "react-circular-progressbar/dist/styles.css";
import AppContext from "../../lib/app-context";
import Timer from "./Timer";

const Pomodoro = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [studyMinutes, setStudyMinutes] = useState(50);
  const [breakMinutes, setBreakMinutes] = useState(10);

  return (
    <>
      <AppContext.Provider
        value={{
          showSettings,
          setShowSettings,
          studyMinutes,
          setStudyMinutes,
          breakMinutes,
          setBreakMinutes,
        }}
      >
        {showSettings ? <PomodoroSetting /> : <Timer />}
      </AppContext.Provider>
    </>
  );
};

export default Pomodoro;
