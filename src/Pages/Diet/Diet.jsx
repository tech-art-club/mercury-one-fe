import React, { useEffect, useState } from 'react';
import Connector from './testCon'

function Diet() {
  const { methods, events } = Connector();
  const [message, setMessage] = useState("");

  useEffect(() => {
    events((method, messageFromSignal) => {
      if (method === methods.ReciveRecipePart)
        setMessage(message + messageFromSignal)

      if (method === methods.ReceiveConnectionId)
        setMessage(message + messageFromSignal)
    });
  });
  return (
    <div>
      <span>message from signalR: <span>{message}</span> </span>
      <br />
      <button>send date </button>
    </div>
  );
}
export default Diet;