import React, { useState } from 'react';
import './chat.css';

function Chat() {
    const serverPFP = [
        '/images/French.png',
        '/images/Octo.png',
        '/images/Girl.png',
        '/images/Hat.png',
    ]

    const userPFP = [
        '/images/Telescope.png',
        '/images/Genie.png',
        '/images/Desk.png',
        '/images/Chemist.png',
        '/images/Nuke.png',
    ]

    const [message, setMessage] = useState({text: "", user: "user", img: getRandomUserPic()}); // sets message to empty string (default value
    const [messages, setMessages] = useState([]);

    function getRandomServerPic() {
        const randomIndex = Math.floor(Math.random() * serverPFP.length);
        return serverPFP[randomIndex];
    }

    function getRandomUserPic() {
        const randomIndex = Math.floor(Math.random() * userPFP.length);
        return userPFP[randomIndex];
    }   

    const sendMessage = async (event) => {

        console.log("sending message: ", message.text)
        
        // send a POST request to the backend
        const response = await fetch('https://xkcd-19e851b8b0b4.herokuapp.com/api/chat', {   // makes a request for data from the backend
            method: "POST",
            headers: {
                'Content-Type': 'application/json'  // tells backend that we are sending JSON data
            },
            body: JSON.stringify({ "message": message.text})   // sends message to backend
        });

        const data = await response.json();

        // The server response
        const serverResponse = {
            text: data.response,
            user: "server",
            img: getRandomServerPic()
        };

        console.log("server message: ", serverResponse.text);

        // add the message to the list of messages
        setMessages([serverResponse, message, ...messages]);
        // console.log(messages);
        // console.log("message: ", message.user);
        // console.log("message: ", message.user == "user");
        // console.log("message: ", serverResponse.user == "server");
    };

    function handleChange(event) {
        setMessage({...message, text: event.target.value}); // sets message to whatever is typed in the input box
    };

    function handleSubmit(event) {
        event.preventDefault();     // prevents page from reloading
        setMessages([message, ...messages]); // adds message to messages array
        sendMessage();  // calls sendMessage function
        setMessage({text: "", user: "user", img: getRandomUserPic()}); // resets message to empty string
    };

    // 
    return (
        <div className="main-container">
            <div className="left-container">
                <img src="/images/Balloon.png" alt="" className="left-image"/>
            </div>
            
            <div className="title-container">
                <h1 className="title">xkcdGPT</h1>
            </div>

            <div className="chat-container">
                <div className="messages-container">
                    {/* console.log("messages: ", messages) */}
                    {messages.map((message, index) => ( // maps through messages array and displays each message
                        // <p key={index}>{message}</p>
                        <div key={index} className={message.user === "user" ? 'user-message' : 'server-message'}>
                            <div className="pfp-container">
                                <img src={message.user === 'server' ? message.img : message.img} alt="" className="pfp"/>
                            </div>
                            <div className="text-container">
                                <p>{message.text}</p>
                            </div>
                            <div className="pfp-container">
                                <img src={message.user === 'server' ? message.img : message.img} alt="" className="pfp"/>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="input-container">
                    <form onSubmit={handleSubmit}>
                        <input type="text" className="input-field" placeholder="Ask me anything!" value={message.text} onChange={handleChange} />
                        <input type="submit" className="input-button" value="Send" />
                    </form>
                </div>

                <div className="right-container">
                    {/* <img src="/images/Squirrel.png" alt="" className="right-image"/> */}
                </div>

            </div>
        </div>
    );
};

export default Chat;    // exports Chat component