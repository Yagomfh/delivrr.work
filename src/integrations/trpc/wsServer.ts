import { applyWSSHandler, CreateWSSContextFn } from '@trpc/server/adapters/ws';
import { TRPCRouter, trpcRouter } from './router';
import { createTRPCContext } from './init';
import { serve } from 'bun';

const wss = serve({
  port: 3000,
  websocket: {
    data: {} as { authToken: string },
    message: (ws, message) => {
      console.log(`Received ${message}`);
      // send back a message
      ws.send(`You said: ${message}`);
    },
  },
  fetch: (req, server) => {
    return server.fetch(req);
  },
});

const handler = applyWSSHandler({
  wss,
  router: trpcRouter,
  createContext: createTRPCContext as unknown as CreateWSSContextFn<TRPCRouter>,
  // Enable heartbeat messages to keep connection open (disabled by default)
  keepAlive: {
    enabled: true,
    // server ping message interval in milliseconds
    pingMs: 30000,
    // connection is terminated if pong message is not received in this many milliseconds
    pongWaitMs: 5000,
  },
});