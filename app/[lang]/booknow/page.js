
import "../../styles/booknow.css"
import BookingManager from "./components/bookingmanager.js";

export default function BookNow({session}) {

  console.log(session);
    return (
      <>
        <BookingManager showSteps={false} session={session}/>
      </>
    )
  }