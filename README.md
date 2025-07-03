# Alert System

A simple real-time web-based alert/notification system using Node.js, Express, and Socket.IO. This project demonstrates how to send system notifications to all connected clients via WebSockets.

## Features
- Real-time system alerts using WebSockets (Socket.IO)
- Simple web interface to trigger and receive alerts
- Browser notifications (with permission)
- Broadcasts alerts to all connected users

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd alert-system
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application
Start the server:
```bash
npm start
# or
yarn start
```

The server will run at [http://localhost:3000](http://localhost:3000).

Open this URL in multiple browser tabs or devices. Click the **Send Alarm** button to broadcast a system notification to all connected clients. Make sure to grant notification permissions in your browser.

## Project Structure
```
alert-system/
  index.js           # Main server file (Express + Socket.IO)
  package.json       # Project metadata and dependencies
  public/
    index.html       # Frontend client
    ...              # Static assets
```

## Dependencies
- [Express](https://expressjs.com/) - Web framework for Node.js
- [Socket.IO](https://socket.io/) - Real-time bidirectional event-based communication

## Configuration
No additional configuration or environment variables are required. The server listens on port 3000 by default.

## Testing
No automated tests are included in this project.

## License
ISC

## Author
[Your Name Here]

---
Feel free to contribute or open issues for suggestions and improvements. 