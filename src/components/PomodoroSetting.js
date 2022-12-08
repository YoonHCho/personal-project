import ReactSlider from "react-slider";
import './pomodoro.css'

const PomodoroSetting = ({studyMinutes, setStudyMinutes, breakMinutes, setBreakMinutes}) => {

  const onStudyChange = (e) => {
    console.log(e);
    setStudyMinutes(e)
    console.log(studyMinutes);
  }

  const onBreakChange = (e) => {
    setBreakMinutes(e)
  }

  return(
    <>
      <div style={{textAlign:'left'}} className='pomoall'>
        <label>Study in Minutes: {studyMinutes}</label>
        <ReactSlider
          className={'slider'}
          thumbClassName={'thumb'}
          trackClassName={'track'}
          value={studyMinutes}
          onChange={onStudyChange}
          min={25}
          max={150}
        />
        <label>Break in Minutes: {breakMinutes}</label>
        <ReactSlider
          className={'slider'}
          thumbClassName={'thumb'}
          trackClassName={'track'}
          value={breakMinutes}
          onChange={setBreakMinutes}
          min={5}
          max={25}
        />
      
      
      </div>


      
    </>
  );
};

export default PomodoroSetting;