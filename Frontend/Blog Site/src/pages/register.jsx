import { useState } from 'react'


const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function register(event) {
    event.preventDefault();
    const responce = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'}
    })

    if(responce.status === 200) {
      alert("registration successful");
    }else {
      alert("registration failed");
    }
    setUsername('');
    setPassword('');
  }

  return (
    <div className="centered">
        <h1>Register</h1>
        <form className="register" onSubmit={register}>
            <input 
            type="text" 
            placeholder="username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)} />

            <input 
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />

            <button>Register</button>
        </form>
    </div>
  )
}

export default Register