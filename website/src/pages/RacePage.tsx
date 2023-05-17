import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useParams } from "react-router-dom";
import { Button } from "../components/Button";
import isaiah from "../images/isaiah.jpeg";

function randomMessage(options: string[]) {
  return options[Math.floor(Math.random() * options.length)];
}

export default function RacePage() {
  const { race } = useParams();
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [goal, setGoal] = useState(0);
  const [person1Followers, setPerson1Followers] = useState(0);
  const [person2Followers, setPerson2Followers] = useState(0);

  const [person1, setPerson1] = useState("");
  const [person2, setPerson2] = useState("");

  const [funMessage, setFunMessage] = useState("");

  useEffect(() => {
    console.log(race);
    if (!race) {
      setErrorMessage("Must specify the race!");
      setValid(false);
    } else {
      setValid(true);
      // TODO: load twitter users and their stats.

      setPerson1(race.split("-vs")[0]);
      setPerson2(race.split("-")[2]);
      setGoal(parseInt(race.split("-")[4]));

      // setPerson1Followers(Math.min(69, goal));
      // setPerson2Followers(Math.min(4200, goal));
      setPerson1Followers(69);
      setPerson2Followers(4200);
      setLoading(false);
    }
  }, [race, goal]);

  useEffect(() => {
    //Sets the fun message
    const highestUser = person1Followers > person2Followers ? person1 : person2; //nice
    const lowestUser = person1Followers > person2Followers ? person2 : person1;
    const highestUserCount =
      person1Followers > person2Followers ? person1Followers : person2Followers;
    const lowestUserCount =
      person1Followers > person2Followers ? person2Followers : person1Followers;
    const difference = Math.abs(person1Followers - person2Followers);
    const percentDifference = difference / goal;

    // How far the lead person is from the goal.
    const distance = Math.abs(goal - highestUserCount);
    const distancePercent = (goal - distance) / goal;
    const closeToHalf = distancePercent > 0.47 && distancePercent < 0.53;
    const soClose = distancePercent > 0.95;
    const tiedUp = percentDifference < 0.05;
    const oneWinner = highestUserCount >= goal;
    const everyonesAWinner =
      person1Followers >= goal && person2Followers >= goal;

    console.log("Race Stats");
    console.log("difference", difference);
    console.log("percentDifference", percentDifference);
    console.log("Distance", distance);
    console.log("DistancePercent", distancePercent);
    console.log("closeToHalf", closeToHalf);

    if (everyonesAWinner) {
      setFunMessage("The race is over! 🎉");
    } else if (oneWinner) {
      setFunMessage("@" + highestUser + " won the race! 🎉");
    } else if (closeToHalf) {
      setFunMessage("Ohhh... we're halfway there 🎵");
    } else if (tiedUp) {
      setFunMessage("It's too close to call! 🏁😮");
    } else if (highestUserCount > lowestUserCount + 0.2 * goal) {
      const options: string[] = [
        "@" + highestUser + " is way ahead! Can they be stopped? ☄️",
        "@" + highestUser + " is on FIRE 🔥🔥",
        "@" +
          highestUser +
          " is way ahead! Could @" +
          lowestUser +
          " have the comeback of the century?",
      ];
      setFunMessage(randomMessage(options));
    } else {
      const options: string[] = [
        "@" + highestUser + " is taking the lead! 🚀",
        "@" + highestUser + " is in the lead! Will it last? 🤔",
        "@" +
          highestUser +
          " is getting ahead! Will @" +
          lowestUser +
          " make a comeback?",
        "@" + highestUser + " started from the bottom now we're here 🎵😎",
      ];
      setFunMessage(randomMessage(options));
    }
  }, [person1Followers, person2Followers, person1, person2, goal]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <Header />
      <div className="flex flex-col items-center flex-1 p-5">
        <h1 className="text-5xl font-bold text-blue-400 ">
          TwitterRace 🚀
        </h1>
        <h1 className="text-3xl font-semibold text-gray-800 mt-5">
          <span className="text-blue-400">
            <a href={"https://twitter.com/" + person1}>@{person1}</a>
          </span>
          {" vs "}
          <span className="text-blue-400">
            <a href={"https://twitter.com/" + person2}>@{person2}</a>
          </span>
        </h1>
        <h3 className=" text-lg  text-gray-500 ">to {goal} followers</h3>
        <div className="max-w-md w-full">
          <ProgressBar
            totalGoal={goal}
            currentValue={person1Followers}
            name={person1}
            profilePic={"joemama"}
          />
          <ProgressBar
            totalGoal={goal}
            currentValue={person2Followers}
            name={person2}
            profilePic={"joemama"}
          />
        </div>

        <h3 className="text-md md:text-lg  text-gray-500 text-center mt-5  ">
          {funMessage}
        </h3>

        <Button color="blue" className="mt-5" href={`/`}>
          Share on Twitter
        </Button>

        <Button color="slate" className="mt-5" href={`/`}>
          Create your own race
        </Button>
        {/* Race */}
      </div>
      <Footer />
    </div>
  );
}

function ProgressBar({
  totalGoal,
  currentValue,
  name,
  profilePic,
}: {
  totalGoal: number;
  currentValue: number;
  name: string;
  profilePic: string;
}) {
  const percent = Math.min(currentValue, totalGoal) / totalGoal;

  return (
    <div className="flex flex-row w-full mt-10">
      <img className="rounded-full w-16 h-16 bg-slate-500 mr-3 mt-2" src={isaiah} />
      
      <div className={"mb-2 flex flex-col flex-1"}>
        <p className="text-xl text-slate-600 mb-2"> 
        <a href={"https://twitter.com/" + name}>@{name}</a>
        </p>
        <div className="w-full h-8 relative rounded-2xl bg-slate-200">
          <div
            className={`w-${percent} bg-blue-400 h-full rounded-2xl relative`}
            style={{
              width: percent * 100 + "%",
              minWidth: "32px",
            }}
          />
        </div>
        <div className=" text-md text-slate-500 mt-1 ml-2">
          {currentValue} / {totalGoal}
        </div>
      </div>
    </div>
    // <>
    //   <div className={" mt-10 mb-2 flex items-center"}>
    //     <img
    //       className="rounded-full w-12 h-12 bg-slate-500 mr-2"
    //       src={isaiah}
    //     />
    //     <p className="text-xl text-slate-600 ">@{name}</p>
    //   </div>

    //   <div className="w-full h-8 relative rounded-2xl bg-slate-200">
    //     <div
    //       className={`w-${percent} bg-blue-400 h-full rounded-2xl relative`}
    //       style={{
    //         width: percent * 100 + "%",
    //         minWidth: "32px",
    //       }}
    //     />
    //   </div>
    //   <div className=" text-md text-slate-500 mt-1 ml-2">
    //     {currentValue} / {totalGoal}
    //   </div>
    // </>
  );
}
