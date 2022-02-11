import React, { useRef, useEffect } from 'react';
import msgStyles from './Messages.module.css';


const Messages = ({ messages, name }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);


  return (
    <ul className={msgStyles.ChatWrapper}>
      {
        messages.map(message =>
          <li key={message.id} className={msgStyles.Message}>
            <span className={message.name === name ? msgStyles.MyMessage : msgStyles.TheirMessage}>
              {message.name === name ? message.text : message.name + ": " + message.text }
            </span>
          </li>
        )
      }
      <div ref={messagesEndRef} />
    </ul>
  );
}

export default Messages;
