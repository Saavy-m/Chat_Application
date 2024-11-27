# Hiring Task - Real Time Chat Application

This repository contains a real-time chat application built with React on the frontend and Node.js on the backend. The project demonstrates the principles of concurrency, real-time communication, and asynchronous programming.

## Architecture Overview

This application follows a **client-server model**:


- **Backend (Node.js):**
  - Manages WebSocket connections and handles real-time message broadcasting with **Socket.io**.
  - Operates entirely in memory to manage chat rooms and messages.
  - Removes disconnected users from memory to maintain an efficient in-memory model.
  - Tracks users and their respective chat rooms entirely in memory. Each room is identified by a unique room ID, allowing for scoped message 
    broadcasting.

- **Frontend (React):**
  - Users enter their name, email, and room ID to join a chat room.
  - Messages are displayed in real-time using **Socket.io-client**.
  - Built with reusable React components like `RoomInfo` (collects user details) and `ChatRoom` (handles chat functionality).
    
---

## Concurrency Handling

The application uses **Socket.io** to handle concurrency effectively:

- **Room Management:** Each chat room is identified by a unique room ID. Messages are broadcasted only to clients in the respective room.
- **Asynchronous Programming:** The Node.js event loop ensures the non-blocking handling of multiple client connections and messages simultaneously.
- **Error Handling:** The server is equipped to handle common issues like disconnected clients, empty messages and invalid room IDs.

---

## Assumptions and Design Choices

1. **No Persistent Storage:** 
   - Messages and room details are stored in memory and will be lost when the server restarts.
   - This decision prioritizes simplicity and focuses on real-time communication.

2. **Frontend Logic:**
   - Socket connections are managed using React's Context API to maintain clean and modular code.

3. **Scalability:**
   - While this application can handle multiple users concurrently, it is best suited for smaller chat groups due to the lack of database or Redis integration.

---

## Installation and Usage

### Prerequisites

- **Node.js** (v14+ recommended)
- **npm** or **yarn**
- **React** (installed via `vite`)

### Steps to Run the Application

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Saavy-m/Chat_Application
   cd Chat_Application
   ```
2. **Setup Backend:**
  ```bash
   cd Backend ChatApplication
   npm install
   npm run dev
   ```
3. **Setup Frontend**
 ```Bash
  cd Frontend ChatApplication
  npm install
  npm run dev
 ```
**Access the Deployed Version ( Backend on Render and Frontend on Vercel )** - link
