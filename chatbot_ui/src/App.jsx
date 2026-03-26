import { useState } from 'react'




function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    const userMsg = { sender: "user", text: message };
    setChat([...chat, userMsg]);

    const res = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    console.log(data);

    const botMsg = { sender: "bot", text: data.bot};
    setChat((prev) => [...prev, botMsg]);

    setMessage("");
  };

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100vh",width:"100%",position:"fixed" ,gap:"50px"}}>
      <div style={{
        width:"100%" ,height:"3rem",backgroundColor:"black" ,display:"flex",flexDirection:"column", alignitem:"center"
      }}>
        <h2 style={{color:"white"}}>AI Chatbot</h2>

      </div>
      <div  style={{
          display:"flex",flexDirection:"row",justifyContent:"center",height:"40px",width:"",gap:"10px"}}>
        <input style={{width:"500px",borderRadius:"5%"}}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",height: "300px",width:"1000px",paddingLeft:"250px"}}>
          <div style={{border:"1px solid black",height:"400px",width:"700px",overflowY:"auto"}}>
            {chat.map((msg, index) => (
              <div key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
                <p><b>{msg.sender}:</b> {msg.text}</p>
              </div>
            ))}
          </div>
        </div>
    </div>

      
      
    
   
  );
}

export default App;
    