import React from 'react';
import onlineStyles from './OnlineBox.module.css';


const OnlineBox = ({ online, name }) => {
  return (
    <ul className={onlineStyles.Box}>
      <h2>Online</h2>
      {
        online.map(user =>
          user.name !== name &&
            <li key={name} className={onlineStyles.UserBox}>
              <span className={onlineStyles.GreenBall} />
              {user.name}
            </li>
        )
      }
    </ul>
  );
}

export default OnlineBox;
