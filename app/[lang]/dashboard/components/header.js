import { DefaultUserImage } from "@/app/ui/ui";
export default function Header({user}){
    return(
                  
                  <header className="bg-white border-b p-4">
                  {/* User Profile */}
                  <div className="flex items-center">
                      <DefaultUserImage />
                    <span className="text-gray-800">{user.name}</span>
                  </div>
                </header>
    )
}