# Real-Time Shared Grid App

A real-time multiplayer grid application where users can claim and unclaim tiles on a shared board.  
All updates are synchronized instantly across connected clients using WebSockets.

## Features

- Real-time tile synchronization
- Multiplayer shared grid
- Claim / unclaim tiles
- Live updates across all connected users
- Prevents claiming already owned tiles
- Server-authoritative state management
- Socket.IO based event-driven architecture

---

# Tech Stack

## Frontend
- React
- Socket.IO Client

## Backend
- Node.js
- Express
- Socket.IO

---

# Architecture

```txt
Frontend Clients
       │
       │ WebSocket Events
       ▼
Socket.IO Server
       │
       ▼
Shared In-Memory Grid State

# Tech Stack Choices

- React — Used to build a dynamic and component-based frontend UI.
- Node.js — Used to handle asynchronous real-time communication on the server.
- Express — Used to create the backend HTTP server and middleware layer.
- Socket.IO — Used for real-time bidirectional communication between clients and server.
- In-Memory State — Used to store shared grid data temporarily for fast MVP development.
- Event-Driven Architecture — Used to synchronize multiplayer actions through socket events.
- Server-Authoritative Architecture — Used to keep backend as the single source of truth for game state.