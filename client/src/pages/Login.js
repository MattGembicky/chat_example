import React, { useEffect } from 'react';
import LoginBox from '../components/LoginBox/index.js';


const Login = ({ socket, setName, name  }) => {
  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <div style={{width: "100vw", height: "100vh", backgroundColor: "var(--black)"}}>
      <LoginBox socket={socket} setName={setName} name={name}/>
    </div>
  );
}

export default Login
