/**
 * Required External Modules
 */

import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { Api } from "./api";
import cookieParser from "cookie-parser";
import http from "http";
dotenv.config();

if (!process.env.PORT) { process.exit(1); }
const PORT: number = parseInt(process.env.PORT as string, 10);

/**
 *  App Configuration
 */
const app = express();
const server = http.createServer(app);

app.use(helmet({
  contentSecurityPolicy: false,
}
));

const allowedOrigins = [
  '*',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://127.0.0.1:5173',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',

  "https://twitterrace.com",
  "https://www.twitterrace.com",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));
app.use(cookieParser());
app.use("/api", Api);

server.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
  console.log(`http://localhost:${PORT}`);
  return;
});
