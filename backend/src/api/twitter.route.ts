
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
    const {p1, p2, g} = req.query;
    if (!p1 || !p2 || !g) {
      console.log("Must specify person1, person2, and goal (p1, p2, g) query params");
    }
    
    res.status(200).json({
      person1Followers: 100,
      person2Followers: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

router.get("/twitter/race", getRaceInfo);

