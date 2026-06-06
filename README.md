# DuoWatch

DuoWatch is a web application designed for two users to engage in live chatting, video calling, and eventually movie streaming. It provides a real-time, peer-to-peer communication experience.

## Repository Structure

- `/duowatch` - The main web application directory containing the frontend and backend logic.

## Features

- **Live Chatting**: Real-time messaging between users.
- **Video Calling**: Peer-to-peer video and audio communication.
- **Authentication**: Secure login using Email and OAuth providers.

## Tech Stack

- **Frontend**: ReactJS, React Router, HTML, CSS, JavaScript
- **Backend**: Custom Express Server (`index.js`) with Node.js
- **Real-time Communication**: Socket.io (for Chatting and WebRTC Signaling)
- **Video Calling**: WebRTC API
- **Database**: Prisma ORM with SQLite (scalable to PostgreSQL)
- **Authentication**: NextAuth.js (Auth.js)

## Getting Started

Currently, the web app (ReactJS frontend + Express backend) is initialized inside the `duowatch` folder.

1. Navigate to the app directory:
   ```bash
   cd duowatch
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server (Note: Once the custom server is set up, this command will change):
   ```bash
   npm run dev
   ```

## Roadmap

1. Implement real-time live chatting.
2. Integrate WebRTC for video calling.
3. Add movie streaming capabilities.
