import React, { useState, useEffect, useRef } from 'react';

export const Length: React.FC = () => {
  const [lengthForDay, setLengthForDay] = useState<number>(0);
  const [lengthForWeek, setLengthForWeek] = useState<number>(0);
  const usedMetersRef = useRef<HTMLInputElement>(null);
  const clockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateValueAtMidnight = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      if (hours === 0 && minutes === 0 && seconds === 0) {
        setLengthForDay(0);
        console.log('length for day:', lengthForDay)
      }

      if (hours === 0 && minutes === 0 && seconds === 0 && now.getDay() === 1) {
        setLengthForWeek(0);
      }
    };

    // Ustaw początkową wartość o północy
    updateValueAtMidnight();

    // Ustaw interwał, aby sprawdzać czas co sekundę
    const intervalId = setInterval(() => {
      updateValueAtMidnight();
      
    }, 600);

    // Wyczyszczenie interwału po odmontowaniu komponentu
    return () => clearInterval(intervalId);
  }, []);

  const handleUpdate = () => {
    const newValueDay = lengthForDay + parseInt(usedMetersRef.current.value, 10) || 0;
    const newValueWeek = lengthForWeek + parseInt(usedMetersRef.current.value, 10) || 0;
    setLengthForDay(newValueDay);
    setLengthForWeek(newValueWeek);
  };

  const updateClockDisplay = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    if (clockRef.current) {
      clockRef.current.textContent = timeString;
    }
  };

  useEffect(() => {
    // Aktualizuj czas co sekundę
    const intervalId = setInterval(updateClockDisplay, 1000);

    // Wyczyszczenie interwału po odmontowaniu komponentu
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <input ref={usedMetersRef} id="usedMeters" placeholder="Wpisz zużyte metry" />
      <button onClick={handleUpdate}>Aktualizuj metry</button>
      <p>Aktualna długość folii zużyta tego dnia: {lengthForDay}</p>
      <p>Aktualna długość folii zużyta tego tygodnia: {lengthForWeek}</p>
      <div ref={clockRef}></div>
    </div>
  );
};