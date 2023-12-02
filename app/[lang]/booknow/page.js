import "../../styles/booknow.css"
import BookingManager from "./components/bookingmanager.js";

export default function BookNow() {
    return (
      <>
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <h1 className="h1">Booking now Steps by steps</h1>
        </div>

        <BookingManager showSteps={true}/>




      </>
    )
  }