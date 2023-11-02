const roboto = Roboto({
    subsets: ['latin'],
    weight: '300',
  })
  
  export const metadata = {
    title: 'Dashboard | TFG',
    description: 'HAMZA',
  }
  
  export default function BookNowLayout({ children, params }) {
    return (
      <div>
        {children}
      </div>
    )
  }