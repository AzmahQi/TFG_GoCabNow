'use client'
import React, { useState, useEffect } from 'react';

// Card component to wrap each counter
const CounterCard = ({ title, count }) => (
  <div className={`primary p-4 rounded-md shadow-md text-center`}>
    <p className="text-lg font-bold">{title}</p>
    <p className="text-2xl text-blue-500">{count}</p>
  </div>
);

const StatsCounter = ({ Clients, Drivers, Reservations }) => {
  const [registeredClients, setRegisteredClients] = useState(0);
  const [registeredDrivers, setRegisteredDrivers] = useState(0);
  const [reservations, setReservations] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const increment = 1;
      const finalRegisteredClients = Clients;
      const finalRegisteredDrivers = Drivers;
      const finalReservations = Reservations;

      let currentRegisteredClients = 0;
      let currentRegisteredDrivers = 0;
      let currentReservations = 0;

      const interval = setInterval(() => {
        setRegisteredClients(currentRegisteredClients);
        setRegisteredDrivers(currentRegisteredDrivers);
        setReservations(currentReservations);

        if (currentRegisteredClients < finalRegisteredClients)
          currentRegisteredClients += increment;
        if (currentRegisteredDrivers < finalRegisteredDrivers)
          currentRegisteredDrivers += increment;
        if (currentReservations < finalReservations)
          currentReservations += increment;

        if (
          currentRegisteredClients >= finalRegisteredClients &&
          currentRegisteredDrivers >= finalRegisteredDrivers &&
          currentReservations >= finalReservations
        ) {
          clearInterval(interval);
        }
      }, 1);
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Each counter is wrapped in a CounterCard component */}
      <CounterCard title="Registered Clients" count={registeredClients}  />
      <CounterCard title="Registered Drivers" count={registeredDrivers}  />
      <CounterCard title="Reservations" count={reservations} />
    </div>
  );
};

export default StatsCounter;