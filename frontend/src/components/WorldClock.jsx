import React, { useEffect, useState } from 'react';

const timezones = {
  'New York': 'America/New_York',
  'London': 'Europe/London',
  'Tokyo': 'Asia/Tokyo',
  'Sydney': 'Australia/Sydney',
  'Dubai': 'Asia/Dubai',
  'India': 'Asia/Kolkata',
  'Singapore': 'Asia/Singapore',
  'Los Angeles': 'America/Los_Angeles',
};

const WorldClock = () => {
  const [time, setTime] = useState({});

  useEffect(() => {
    const updateTime = () => {
      const newTime = {};
      Object.keys(timezones).forEach(city => {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: timezones[city],
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeStyle: 'medium',
        });
        newTime[city] = formatter.format(new Date());
      });
      setTime(newTime);
    };

    updateTime(); // Initial call
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div>
      <h2>World Clock</h2>
      <ul>
        {Object.keys(timezones).map(city => (
          <li key={city}>{city}: {time[city]}</li>
        ))}
      </ul>
    </div>
  );
};

export default WorldClock;