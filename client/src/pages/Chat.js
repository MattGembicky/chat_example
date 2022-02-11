import React, { useEffect } from 'react';
import OnlineBox from '../components/OnlineBox';
import ChatBox from '../components/ChatBox';
import { useNavigate } from "react-router-dom";


const Chat = ({ socket, online, name }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(name);
    if(name !== undefined && name !== ""){
      document.title = "Chat";
    } else {
      navigate("/");
    }
  }, [name, navigate]);



  return (
    <div style={{width: "100vw", height: "100vh", backgroundColor: "var(--black)"}}>
      <OnlineBox online={online} name={name}/>
      <ChatBox socket={socket} name={name} />
    </div>
  );
}

export default Chat;
