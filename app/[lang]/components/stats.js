
import StatsCard from "@/app/[lang]/components/statsCard";
import { getClientsAndDriversCount, getReservationCount } from "@/lib/db";

export default async function Stats ({content})  {
    const users = await getClientsAndDriversCount()
    let registeredClients = users.clients;
    let registeredDrivers = users.drivers;
    let reservations = await getReservationCount();
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
