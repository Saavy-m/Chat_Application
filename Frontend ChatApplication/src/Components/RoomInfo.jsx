import React, { useState , useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../Context API/context_socket";

const RoomInfo = () => {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const navigate = useNavigate();
    const context  = useContext(SocketContext);

    const joinRoom = () => {
        if (username && room) {
            // Emit join_room event
            context?.set_userName(username , room);
            context?.socket.emit("join_room", { username, room });

            // Navigate to the ChatRoom
            navigate("/chat", { state: { username, room } });
        } else {
            alert("Please fill in all fields!");
        }
    };

    return (
        <div className="h-full flex-col items-center justify-center">
        <div className="bg-white shadow-lg p-8 rounded-lg max-w-md w-full">
            <h1 className="text-2xl font-bold text-center mb-6">Join ChatRoom</h1>
            <form className="space-y-4 justify-center items-center flex-row">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border border-gray-300 mt-4 rounded focus:outline-none focus:ring focus:ring-indigo-200"
                />
                <input
                    type="text"
                    placeholder="Room ID"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    className="w-full p-2 border border-gray-300 mt-4 rounded focus:outline-none focus:ring focus:ring-indigo-200"
                />
                <div className="w-full flex items-center justify-center">
                <button
                    type="button"
                    onClick={joinRoom}
                    className="w-[70%] bg-black text-white py-2 mt-4 rounded-full hover:bg-slate-200 hover:text-black hover:border hover:border-black hover:font-bold"
                >
                    Join Room
                </button>
                </div>
            </form>
        </div>
        <div className="w-full h-full text-center font-semibold bottom-4 mt-10 flex justify-center items-center">
            <div>
                <p>By Satyam Shukla</p>
                <p>satyamofficial4916@gmail.com</p>
                <p>Hiring Task - Backend Developer - Kuvaka-Tech</p>
            </div>
        </div>
        </div>
    );
};

export default RoomInfo;
