import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// Create the Socket Context
export const SocketContext = createContext();

// Define the provider for the Socket Context
export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [name, setName] = useState(null);
    const [roomName , setroomName] = useState();

    const set_userName = (userName , room) => {
        console.log("Name received " , userName , "room received " , room);
        setName(userName);
        setroomName(room);
    };

    useEffect(() => {
        // Initialize the socket connection
        const newSocket = io("https://chat-application-backend-vhlo.onrender.com"); // Replace with backend URL if deployed
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, name, roomName, set_userName }}>
            {children}
        </SocketContext.Provider>
    );
};

// Custom hook for using the socket context
export const useSocket = () => {
    return useContext(SocketContext);
};
