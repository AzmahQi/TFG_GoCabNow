
import StatsCard from "./statsCard";

const Stats = () => {
    const registeredClients = 100;
    const registeredDrivers = 10;
    const reservations = 200;
    return(
      <section id="stats" className="secondary shadow-md px-6 py-4 w-full">
      <div className="container mx-auto text-center">
        <StatsCard
        Clients={registeredClients}
        Drivers={registeredDrivers}
        Reservations={reservations}
        />
        </div>
        </section>
    )
}
export default Stats;