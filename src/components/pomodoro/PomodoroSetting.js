import ReactSlider from "react-slider";
import AppContext from "../../lib/app-context";
import { useContext } from "react";
import "./pomodoro.css";

const PomodoroSetting = () => {
  const settingsInfo = useContext(AppContext);

  return (
    <>
      <div className="container font-monospace">
        <div className="row justify-content-center align-items-center">
          <div className="my-5">
            <label>Study in Minutes: {settingsInfo.studyMinutes}</label>
            <ReactSlider
              className={"slider"}
              thumbClassName={"thumb"}
              trackClassName={"track"}
              value={settingsInfo.studyMinutes}
              onChange={(newVal) => settingsInfo.setStudyMinutes(newVal)}
              min={25}
              max={150}
            />
            <label>Break in Minutes: {settingsInfo.breakMinutes}</label>
            <ReactSlider
              className={"slider red"}
              thumbClassName={"thumb"}
              trackClassName={"track"}
              value={settingsInfo.breakMinutes}
              onChange={(newVal) => settingsInfo.setBreakMinutes(newVal)}
              min={5}
              max={25}
            />
          </div>
          <div className="text-center">
            <button onClick={() => settingsInfo.setShowSettings(false)}>
              Back to Timer
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PomodoroSetting;
