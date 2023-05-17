import express from "express";
import { router as twitterRouter } from "./twitter.route";

export const Api = express.Router();
Api.use(twitterRouter);

Api.get("/", (req, res) => {
  res.send("Hello World!");
});