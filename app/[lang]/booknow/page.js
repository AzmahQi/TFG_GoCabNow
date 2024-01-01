
import "../../styles/booknow.css"
import BookingManager from "@/app/[lang]/booknow/components/bookingmanager"

export default function BookNow({dictionary,session}) {

    return (
        <BookingManager content={dictionary.bookNow} showSteps={false} session={session}/>
    )
  }