import React, { useState, useEffect, useRef } from 'react';

const App = () => {

  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      clearInterval(intervalIdRef.current);
    }

    return () => clearInterval(intervalIdRef.current);
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
    setLaps([]);
  }

  function lap() {
    setLaps([...laps, elapsedTime]);
  }

  function formatTime(time) {
    let hours = Math.floor(time / (1000 * 60 * 60));
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let seconds = Math.floor((time / 1000) % 60);
    let milliseconds = Math.floor((time % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-600">
      <div className="border border-xl-slate-800 rounded-xl bg-slate-700 shadow-slate-800 shadow-2xl p-8">
        <div className="text-4xl font-mono mb-5 text-yellow-50">{formatTime(elapsedTime)}</div>
        <div className="space-x-3">
          <button onClick={start} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Start</button>
          <button onClick={stop} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Stop</button>
          <button onClick={reset} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Reset</button>
          <button onClick={lap} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Lap</button>
        </div>
        {laps.length > 0 && (
          <div className="mt-5">
            <h2 className="text-2xl font-mono text-yellow-50 mb-3">Lap Times</h2>
            <ul className="list-disc list-inside text-yellow-50">
              {laps.map((lap, index) => (
                <li key={index} className="text-lg">{`Lap ${index + 1}: ${formatTime(lap)}`}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
