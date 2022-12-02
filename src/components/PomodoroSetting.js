import ReactSlider from "react-slider";
import './pomodoro.css'

const PomodoroSetting = ({setStudy}) => {

  return(
    <>
      <div style={{textAlign:'left'}} className='pomoall'>
        <label>Study in Minutes</label>
        <ReactSlider
          className={'slider'}
          thumbClassName={'thumb'}
          trackClassName={'track'}
          value={50}
          min={25}
          max={150}
        />
        <label>Break in Minutes</label>
        <ReactSlider
          className={'slider'}
          thumbClassName={'thumb'}
          trackClassName={'track'}
          value={10}
          min={5}
          max={25}
        />
      
      
      </div>


      
    </>
  );
};

export default PomodoroSetting;