# Scalable Chat Server

A Node.js-based chat server that provides a RESTful API for managing conversations between customers and agents. The application implements clustering for improved performance and scalability.

## Features

- Real-time chat server with conversation management
- In-memory storage with automatic cleanup for inactive conversations
- RESTful API for message management
- Node.js clustering to utilize multiple CPU cores

## Requirements

- Node.js (version 14 or higher)
- npm

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/chat-server.git
cd chat_server
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will start on port 3000 by default. You can change this by setting the `PORT` environment variable.

## API Endpoints

### 1. Create a Conversation
- **URL**: `POST /api/conversations`
- **Response**: Returns a unique conversation ID
- **Example**:
  ```bash
  curl -X POST http://localhost:3000/api/conversations
  ```

### 2. Add a Message to a Conversation
- **URL**: `POST /api/conversations/:conversationId/messages`
- **Body**:
  ```json
  {
    "sender": "customer", // or "agent"
    "content": "Hello, I need help with my order",
    "timestamp": 1617293932123 // optional, defaults to current time
  }
  ```
- **Example**:
  ```bash
  curl -X POST http://localhost:3000/api/conversations/12345/messages \
    -H "Content-Type: application/json" \
    -d '{"sender": "customer", "content": "Hello, I need help with my order"}'
  ```

### 3. Get Conversation History
- **URL**: `GET /api/conversations/:conversationId`
- **Response**: Returns all messages in chronological order
- **Example**:
  ```bash
  curl http://localhost:3000/api/conversations/12345
  ```

### 4. Delete a Message
- **URL**: `DELETE /api/conversations/:conversationId/messages/:messageId`
- **Example**:
  ```bash
  curl -X DELETE http://localhost:3000/api/conversations/12345/messages/abcde
  ```

## Clustering Implementation

The application uses Node.js built-in cluster module to spawn worker processes, ideally one per CPU core. This improves performance by distributing the workload across multiple processes.

Key features of the clustering implementation:

1. We have to distribute our traffic on node server.
2. Using of cluster, we can make quick response for our application.

## Important Note

The shared memory implementation in this project is simplified for development purposes. In a production environment, you would need to use a proper solution like Redis, Memcached, or a database for true shared memory across processes.