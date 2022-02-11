import './App.css';
import Login from './pages/Login';
import Chat from './pages/Chat';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import socketClient from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(undefined);
  const [online, setOnline] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const client = socketClient("http://localhost:8001", { transports : ["polling", "websocket"] });
    setSocket(client);
    return () => client.close();
  }, [setSocket]);

  useEffect(() => {
    if(socket === undefined){
      console.log("There is problem with your socket.")
      return;
    }

    socket.on('onlineUsers', (data) => {
      setOnline(data);
    });
  }, [socket, online]);



  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login socket={socket} setName={setName} name={name}/>} />
          <Route path="/chat" element={<Chat socket={socket} online={online} name={name}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
