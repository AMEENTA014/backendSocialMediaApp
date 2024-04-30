import { Server } from 'socket.io';

export function createSocketServer(server) {
  const io = new Server(server);

  // Store user status (online/offline)
  const userStatus = {};

  io.on('connection', (socket) => {
    console.log('a user connected');

    // Handle user coming online
    socket.on('online', (userId) => {
      userStatus[userId] = 'online';
      console.log(`User ${userId} is online`);
    });

    // Handle user going offline
    socket.on('disconnect', (userId) => {
      userStatus[userId] = 'offline';
      console.log(`User ${userId} is offline`);
    });

    // Handle user joining a room
    socket.on('join room', (room) => {
      socket.join(room);
    });

    // Handle user sending a message
    socket.on('message', (room, message, userId) => {
      // Check if the other user in the room is online
      const otherUserId = getOtherUserInRoom(room, userId);
      if (userStatus[otherUserId] === 'online') {
        socket.to(room).emit('message', message);
      } else {
        console.log(`User ${otherUserId} is offline. Message will be stored.`);
        // Store the message in the database for the offline user
      }
    });
  });
}

// This is a placeholder function. You should replace this with your own logic
// to get the other user in the room.
function getOtherUserInRoom(room, userId) {
  // ...
}
console.log('implementations');
//useroffline /online
//getmessages for pending 
//send messages when online 
//delete messages 
//update messages with time limit 
