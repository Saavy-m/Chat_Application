import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoomInfo from "./Components/RoomInfo";
import Join_room from "./Components/join_room";
import { SocketProvider } from "./Context API/context_socket";

function App() {
    return (
        <SocketProvider>
            <Router>
                <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                    <Routes>
                        <Route path="/" element={<RoomInfo />} />
                        <Route path="/chat" element={<Join_room />} />
                    </Routes>
                </div>
            </Router>
        </SocketProvider>
    );
}

export default App;
