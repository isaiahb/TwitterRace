
import express, { Response, Request } from "express";
import * as TwitterService from "../services/twitter.service";
export const router = express.Router();

async function getStats(p1: string, p2: string) {
  const person1Stats = await TwitterService.getTwitterUser(p1);
  const person2Stats = await TwitterService.getTwitterUser(p2);
  return {
    person1Stats,
    person2Stats,
  }
}

async function getRaceInfo(req: Request, res: Response) {
  try {
    const {p1, p2} = req.query;
    if (!p1 || !p2) {
      console.log("Must specify person1, person2, and goal (p1, p2, g) query params");
    }
    const stats = await getStats(p1 as string, p2 as string);
    res.status(200).json({stats});
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
router.get("/twitter/race", getRaceInfo);
