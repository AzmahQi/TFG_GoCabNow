
import StatsCard from "./statsCard";

const Stats = ({content}) => {
    let registeredClients = 100;
    let registeredDrivers = 10;
    let reservations = 200;
    return(
      <section id="stats" className="secondary shadow-md px-6 py-4 w-full">
      <div className="container mx-auto text-center">
      <h2 className="text-3xl font-bold mb-8">{content.title}</h2>
        <StatsCard
        content={content}
        clients={registeredClients}
        drivers={registeredDrivers}
        reservations={reservations}
        />
        </div>
        </section>
    )
}
export default Stats;