import React, { useState, useEffect } from 'react';
import Messages from './Messages';
import chatStyles from './ChatBox.module.css';


const ChatBox = ({ socket, name }) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if(socket === undefined){
      console.log("There is problem with your socket.");
      return;
    }

    socket.on('newMessage', (data) => {
      if(data !== undefined){
        const msgs = [...messages, data];
        setMessages(msgs);
      }
    });
    socket.on('olderMessages', (data) => {
      if(data !== undefined){
        setMessages([...data, ...messages]);
      }
    });

  }, [socket, messages]);

  function sendMessage() {
    if(socket === undefined){
      console.log("There is problem with your socket.");
      return;
    }

    if(text.length > 0 && name.length >= 3){
      setText("");
      socket.emit('message', {name: name, text: text});
    }
  }


  return (
    <div className={chatStyles.Box}>
      <Messages messages={messages} name={name} />
      <input className={chatStyles.Input} type="text" minLength="1" maxLength="255" placeholder="type here..." value={text} onChange={(e) => setText(e.target.value)}/>
      <input className={chatStyles.Submit} type="submit" value="Send" onClick={sendMessage}/>
    </div>
  );
}

export default ChatBox;
