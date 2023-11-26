import { useState } from 'react'

import { Navigate } from 'react-router-dom';


const login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);  

  async function login(e) {
    e.preventDefault();
    const responce = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type' : 'application/json'},
      credentials: 'include',
    });

    if(responce.status === 200) {
      setRedirect(true);
    } else {
      alert('Wrong credentials');
    }

  }
  if(redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="centered">
        <h1>Login</h1>
        <form className="login" onSubmit={login}>
          <input 
            type="text" 
            placeholder="username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />

          <input 
            type="password"             
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />

          <button>Login</button>
        </form>
    </div>
  )
}

export default login