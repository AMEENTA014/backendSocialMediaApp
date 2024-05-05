// chat.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';

export function createChatServer(app) {
  const server = http.createServer(app);
  const io = new Server(server);
  const prisma = new PrismaClient();

  let onlineUsers = {};
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join_room', async (room) => {
      socket.join(room);
      console.log(`User joined room: ${room}`);
      onlineUsers[socket.id] = room;

      const unseenMessages = await prisma.message.findMany({
        where: {
          receiverId: room,
          status: 'PENDING',
        },
      });

   
      socket.emit('unseen_messages', unseenMessages);
    });

    socket.on('message', async (data) => {
      io.to(data.room).emit('message', data);
      console.log(`Message received: ${data.message}`);

      await prisma.message.create({
        data: {
          messageId: data.messageId,
          senderId: data.senderId,
          receiverId: data.receiverId,
          message: data.message,
          timeStamp: new Date(),
          status: onlineUsers[data.receiverId] ? 'SEEN' : 'PENDING',
        },
      });
    });

    socket.on('disconnect', async () => {
      console.log('A user disconnected');
      delete onlineUsers[socket.id];
    });
  });


  return io;
}
