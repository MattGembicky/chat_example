import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import loginStyles from './LoginBox.module.css';


const LoginBox = ({ socket, setName, name }) => {
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const go = () => {
    if(name.length < 3){
      setMessage("Username is too short");
      return;
    }
    setMessage("");

    socket.emit('setName', {name: name});
  };

  useEffect(() => {
    if(socket === undefined){
      console.log("There is problem with your socket.");
      return;
    }

    socket.on('unusedName', () => {
      navigate("/chat");
    });

    socket.on('usedName', () => {
      setMessage("Username is already used");
    });
  }, [socket, navigate]);

  return (
    <div className={loginStyles.Box}>
      <h2>Enter name</h2>
      <input className={loginStyles.Input} type="text" maxLength="20" placeholder="name" onChange={(e) => setName(e.target.value)}/>
      <input className={loginStyles.Submit} type="submit" value="Chat" onClick={go}/>
      <span className={loginStyles.ErrorText}>{message}</span>
    </div>
  );
}

export default LoginBox;
