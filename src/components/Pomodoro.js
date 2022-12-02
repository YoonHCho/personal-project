import { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import PomodoroSetting from './PomodoroSetting';
import 'react-circular-progressbar/dist/styles.css';

const Pomodoro = () => {
  const [ counting, setCounting ] = useState(false);
  const [ studyMinutes, setStudyMinutes ] = useState(100);
  const [ breakMinutes, setBreakMinutes ] = useState(5);
  const [ seconds, setSeconds ] = useState(12);

  const setStudy = () => {
    setStudyMinutes(25);
  }

  // useEffect(() => {
  //   const timeID = setTimeout(() => {
  //     if (seconds === 0) {
  //       setSeconds(prev => {
  //         console.log(typeof prev);
  //         return prev + 59;
  //     });
  //       setMinutes(prev => prev - 1)
  //     } else {
  //       setSeconds(prev => prev - 1);
  //     }
  //   }, 1000)
  //   // console.log(typeof seconds);

  //   if (minutes === 0 && seconds === 0) {
  //     clearInterval(timeID);
  //   }
  // })
  
  const checkClick = e => {
    console.log(e);
  }
  
  return (
    <>
      {/* {console.log(typeof minutes)}
      {console.log(typeof seconds)} */}
      <div style={{ width: 460, height: 460 }}>
        <CircularProgressbar value={studyMinutes} minValue={0} maxValue={studyMinutes} text={ `${studyMinutes.toLocaleString(undefined,{minimumIntegerDigits: 2})}:${seconds.toLocaleString(undefined,{minimumIntegerDigits: 2})}` } />
      </div>


      {/* <div>{minutes.toLocaleString(undefined,{minimumIntegerDigits: 2})}:{seconds.toLocaleString(undefined,{minimumIntegerDigits: 2})}</div> */}

      {/* PLAY ICON */}
      <svg xmlns="http://www.w3.org/2000/svg" width="100" viewBox="0 0 24 24"  fill="currentColor" className="w-6 h-6" onClick={checkClick}>
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clipRule="evenodd" />
      </svg>


      {/* PAUSE ICON */}
      <svg xmlns="http://www.w3.org/2000/svg" width="100" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 start" onClick={checkClick}>
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM9 8.25a.75.75 0 00-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75H9zm5.25 0a.75.75 0 00-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75h-.75z" clipRule="evenodd" />
      </svg>

      <button width="100px">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 pause" onClick={checkClick}>
          <path fillRule="evenodd" d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 01-.517.608 7.45 7.45 0 00-.478.198.798.798 0 01-.796-.064l-.453-.324a1.875 1.875 0 00-2.416.2l-.243.243a1.875 1.875 0 00-.2 2.416l.324.453a.798.798 0 01.064.796 7.448 7.448 0 00-.198.478.798.798 0 01-.608.517l-.55.092a1.875 1.875 0 00-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 01-.064.796l-.324.453a1.875 1.875 0 00.2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 01.796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 01.517-.608 7.52 7.52 0 00.478-.198.798.798 0 01.796.064l.453.324a1.875 1.875 0 002.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 01-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 001.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 01-.608-.517 7.507 7.507 0 00-.198-.478.798.798 0 01.064-.796l.324-.453a1.875 1.875 0 00-.2-2.416l-.243-.243a1.875 1.875 0 00-2.416-.2l-.453.324a.798.798 0 01-.796.064 7.462 7.462 0 00-.478-.198.798.798 0 01-.517-.608l-.091-.55a1.875 1.875 0 00-1.85-1.566h-.344zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
        </svg>
        Setting
      </button>


      <PomodoroSetting setStudy={setStudy} />
    </>

  );
}

export default Pomodoro;