import { useState, useRef, useEffect } from "react";

const StopWatch = () => {
  const [isRunning, setIsReunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setTimeElapsed(Date.now() - startTimeRef.current);
      }, 10);
      return () => {
        clearInterval(intervalIdRef.current);
      };
    }
  }, [isRunning]);

  const start = () => {
    setIsReunning(true);
    startTimeRef.current = Date.now() - timeElapsed;
  };

  const stop = () => {
    setIsReunning(false);
  };

  const reset = () => {
    setTimeElapsed(0);
    setIsReunning(false);
  };

  function formatTime() {
    //let hours = Math.floor(timeElapsed / (1000 * 60 * 60));

    let minutes = Math.floor((timeElapsed / (1000 * 60)) % 60);
    let seconds = Math.floor((timeElapsed / 1000) % 60);
    let melisec = Math.floor((timeElapsed % 1000) / 10);
    //hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    melisec = String(melisec).padStart(2, "0");
    return `${minutes}:${seconds}:${melisec}`;
  }

  return (
    <>
      <div className="stopWatch">
        <div className="display">{formatTime()}</div>
        <div className="controles">
          <button className="start-button" onClick={start}>
            Start
          </button>
          <button className="stop-button" onClick={stop}>
            Stop
          </button>
          <button className="reset-button" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default StopWatch;
