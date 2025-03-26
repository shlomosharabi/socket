import  { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3006");
function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    socket.on("message", (msg) => {
      console.log("Message from server:", msg);
      setMessages((prev: string[]) => [...prev, msg.message]);
    });

    return () => {
      socket.off("connect");
      socket.off("message");
      socket.disconnect();
    };
  }, [socket]);

  const sendMessage = () => {
    if (input.trim() !== "") {
      socket.emit("message", {
        message: input,
      });
      setInput("");
    }
  };

  return (
    <div>
      <h1>Socket.IO Chat</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
