import React, { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from '../Context API/context_socket';

const JoinRoom = () => {
  const context = useContext(SocketContext);

  const messageContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [targetMessage, setTargetMessage] = useState("");

  const handleSendMessage = () => {
    if (context?.socket) {
      if(targetMessage != ''){
        const data = {
          username: context?.name,
          message: targetMessage,
          room : context?.roomName
        };
        setMessages((prevMessages) => [...prevMessages, data]);
        context.socket.emit('send_message', { data });
        console.log("sending message:", data);
        setTargetMessage('');
      }
    }
  };

  useEffect(() => {
    if (context?.socket) {
      const handleGetMessage = ({ username, message }) => {
        console.log("data on getMessage:", username , message);
        const newMessage = {
          senderID: username,
          MessageString: message,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      };

      context.socket.on('receive_message', handleGetMessage);
      context.socket.on('user:joined', (socketId , room) => {
          console.log("user:joined has send the data : " ,socketId , room);
      context.socket.on('joined_successfully', (socketId , room)=> {
          console.log(`${socketId} joined room ${room} successfully`)
      })
      });

      return () => {
        context.socket.off('getMessage', handleGetMessage);
      };
    }
  }, [context?.socket]); // Dependency includes context?.socket

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  return (
    <div className="h-screen bg-cover">
      <div className="h-screen w-screen">
        <div className="flex flex-col justify-center p-4">
          <div className="flex mt-6 flex-col items-center justify-center">
            <div className="relative">
              <h1 className="mt-4 p-2 text-3xl text-black font-extrabold">Chat Room</h1>
            </div>
          </div>
          <div className="flex flex-col items-center md:ml-12 w-full mt-16">
            <div className="h-96 overflow-y-scroll p-4 md:w-3/4 w-[90%] shadow-xl mb-[4%] border-gray-200 border-2">
              {messages && messages.length > 0 ? (
                messages.map((message, index) => (
                  
                  <div
                    key={index}
                    className={`mb-4 ${message.senderID === context?.name ? 'text-right' : 'text-left'}`}
                  >
                    
                    <div
                      className={`rounded-lg p-2 max-w-3/4 inline-block ${
                        message.senderID === context?.name ? 'bg-orange-800 text-white' : 'bg-white'
                      }`}
                    ><div className={`${message.senderID === context?.name ? ' text-slate-300' : 'text-red-900'} text-md flex justify-items-end`} >{message.senderID}</div>
                      {message.MessageString}
                    </div>
                    <div ref={messageContainerRef}></div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center font-semibold">Start Messaging Now</div>
              )}
            </div>
            <div className="flex w-[40%] shadow-lg rounded-full">
              <input
                type="text"
                className="w-full text-center p-2 border rounded-l-full"
                placeholder="Type your message..."
                value={targetMessage}
                onChange={(e) => setTargetMessage(e.target.value)}
              />
              <button className="p-2 rounded-r-lg w-20" onClick={handleSendMessage}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-send"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 14l11 -11" />
                  <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
