
import './ResetCSS.css'
import './App.css'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import {Routes, Route} from 'react-router-dom'
import Layout from './components/layout'
import { UserContexProvider } from './userContext'
import CreatePost from './pages/CreatePost'


function App() {
  

  return (
    <UserContexProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/create' element={<CreatePost/>}/>
        </Route>
      
      </Routes>
    </UserContexProvider>
    
  )
}

export default App
