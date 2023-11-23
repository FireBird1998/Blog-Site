import {Link} from 'react-router-dom'
const header = () => {
  return (
    <header>
        <Link to='/' className='logo'>My Blog</Link>
        <nav>
          <Link to="/login">Login</Link> 
          <Link to="/register">Register</Link> 
        </nav>
      </header>
  )
}

export default header