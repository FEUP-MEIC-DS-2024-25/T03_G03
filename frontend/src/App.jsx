import { useState } from 'react'; 

//Custom Components
import VerticalSidePanel from "@/components/VerticalPanel"
import LandingPage from "@/components/LandingPage"
import Header from "@/components/Header"

export default function App() {

  //Static Mock data 
  const user = {
    name: "Teste",
    avatar: "https://picsum.photos/200/300"
  }

    //Vertical Side Bar State
    const [isCollapsed, setIsCollapsed] = useState(false)

    const toggleCollapse = () => {
      setIsCollapsed(!isCollapsed)
    }

  return (

    <>
      <Header user={user} isCollapsed={isCollapsed} toggleCollapse={toggleCollapse}/>
      <section className="flex flex-row items-center w-full min-h-screen bg-white">
        <VerticalSidePanel user={user} isCollapsed={isCollapsed} toggleCollapse={toggleCollapse}/>
        <div className="flex-grow flex items-center justify-center">
          <LandingPage />
        </div>
      </section>
    </>
  )
}
