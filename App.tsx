import * as React from 'react';
import './style.css';
import {useEffect, useState} from 'react';

function Hand({ height = 1, width = 1, angle }) {
  return (
    <div
      aria-hidden={true}
      className="clock-hand"
      style={{
        transform: `rotate(${angle}deg) scaleY(${height}) scaleX(${width})`,
      }}
    />
  );
}

function padTwoDigit(number) {
  return number >= 10 ? String(number) : `0${number}`;
}

const FULL_ROTATION_DEGREES = 360;

export default function App() {
  const [date, setDate] = useState(new Date());
  const hours = date.getHours() % 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const size = 300;
  const secondsPercentage = seconds / 60;
  const minutesPercentage = (minutes + secondsPercentage) / 60;
  const hoursPercentage = (hours + minutesPercentage) / 12;

  const hoursAngle = hoursPercentage * FULL_ROTATION_DEGREES;
  const minutesAngle = minutesPercentage * FULL_ROTATION_DEGREES;
  const secondsAngle = secondsPercentage * FULL_ROTATION_DEGREES;

  const dateTimeDisplay = `${padTwoDigit(
    hours,
  )}:${padTwoDigit(minutes)}:${padTwoDigit(seconds)}`;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDate(new Date())
    }, 100);

    return () => {
      window.clearInterval(timer);
    }
  }, [])

  return (
    <div>
      <time
        className="clock"
        dateTime={dateTimeDisplay}
        style={{
          '--size': `${size}px`,
        }}
      >
      <Hand height={0.5} angle={hoursAngle} width={3} />
      <Hand height={0.9} angle={minutesAngle} width={2} />
      <Hand height={0.8} angle={secondsAngle} />
      </time>
      <span>{dateTimeDisplay}</span>
    </div>
  );
}
