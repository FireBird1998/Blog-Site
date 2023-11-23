import { Outlet } from "react-router-dom"
import Header from "./header"

const layout = () => {
  return (
    <main>
      <Header/>
      <Outlet/>
    </main>
  )
}

export default layout