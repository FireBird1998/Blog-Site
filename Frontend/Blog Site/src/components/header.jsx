import { useContext, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { UserContext } from '../userContext';
const Header = () => {

  const {setUserInfo, userInfo} = useContext(UserContext)

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',

    }).then(res => res.json()).then(userInfo => {
      setUserInfo(userInfo);
    })
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    }).then(() => {
      setUserInfo(null);
    })
  }
  const username = userInfo?.username;
  return (
    <header>
        <Link to='/' className='logo'>My Blog</Link>
        <nav>
          {username && (
            <>
              <Link to="/create">Create new post</Link>
              <a onClick={logout}>Logout</a>
            </>
          )}
          {!username && (
            <>
              <Link to="/login">Login</Link> 
              <Link to="/register">Register</Link> 
            </>
          )}
          
        </nav>
      </header>
  )
}

export default Header