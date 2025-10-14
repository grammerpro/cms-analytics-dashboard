import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { env } from '../config/env.config';

let io: SocketIOServer;

export const initializeWebSocket = (server: HttpServer): SocketIOServer => {
  io = new SocketIOServer(server, {
    cors: {
      origin: env.CLIENT_URL,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('✅ New client connected:', socket.id);

    // Join tenant-specific room
    socket.on('join:tenant', (tenantId: string) => {
      socket.join(`tenant:${tenantId}`);
      console.log(`Client ${socket.id} joined tenant: ${tenantId}`);
    });

    // Handle analytics updates
    socket.on('analytics:update', (data) => {
      console.log('Received analytics update:', data);
      // Broadcast to all clients in the same tenant
      if (data.tenantId) {
        io.to(`tenant:${data.tenantId}`).emit('analytics:realtime', data);
      }
    });

    socket.on('disconnect', () => {
      console.log('❌ Client disconnected:', socket.id);
    });
  });

  // Simulate real-time analytics updates every 5 seconds
  setInterval(() => {
    const mockData = {
      pageViews: Math.floor(Math.random() * 1000) + 500,
      activeUsers: Math.floor(Math.random() * 100) + 50,
      timestamp: new Date().toISOString(),
    };
    io.emit('analytics:realtime', mockData);
  }, 5000);

  return io;
};

export const getIO = (): SocketIOServer => {
  if (!io) {
    throw new Error('Socket.IO not initialized');
  }
  return io;
};

export const emitToTenant = (tenantId: string, event: string, data: any) => {
  if (io) {
    io.to(`tenant:${tenantId}`).emit(event, data);
  }
};
