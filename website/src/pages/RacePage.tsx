import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useParams } from "react-router-dom";
import { Button } from "../components/Button";
import api from "../services/api.service";
import icon from "../../src/images/birds.png";

function randomMessage(options: string[]) {
  return options[Math.floor(Math.random() * options.length)];
}

export default function RacePage() {
  const { race } = useParams();
  const [loading, setLoading] = useState(true);
  const [, setValid] = useState(true);
  const [, setErrorMessage] = useState("");
  // const [loading, setLoading] = useState(true);
  // const [valid, setValid] = useState(true);
  // const [errorMessage, setErrorMessage] = useState("");

  const [goal, setGoal] = useState(0);
  const [person1Followers, setPerson1Followers] = useState(0);
  const [person2Followers, setPerson2Followers] = useState(0);

  const [person1, setPerson1] = useState("");
  const [person2, setPerson2] = useState("");

  const [person1Pic, setPerson1Pic] = useState("");
  const [person2Pic, setPerson2Pic] = useState("");

  const [funMessage, setFunMessage] = useState("");

  useEffect(() => {
    console.log(race);

    async function fetchTwitterData(p1: string, p2: string) {
      const { person1Stats, person2Stats } = await api.twitter.getStats(p1, p2);
      setPerson1Followers(person1Stats.followers);
      setPerson2Followers(person2Stats.followers);

      setPerson1Pic(person1Stats.profilePic);
      setPerson2Pic(person2Stats.profilePic);
      setLoading(false);
    }

    if (!race) {
      setErrorMessage("Must specify the race!");
      setValid(false);
    } else {
      setValid(true);
      // TODO: load twitter users and their stats.
      setLoading(true);

      setPerson1(race.split("-vs")[0]);
      setPerson2(race.split("-")[2]);
      setGoal(parseInt(race.split("-")[4]));
      fetchTwitterData(race.split("-vs")[0], race.split("-")[2]);
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
    // const soClose = distancePercent > 0.95;
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

  if (loading)
    return (
      <div className="flex flex-col items-center flex-1">
        <div
          style={{ display: "flex", alignItems: "center" }}
          className={"mt-40"}
        >
          <h1 className="text-2xl  text-gray-400">Loading this </h1>
          <h1 className="text-2xl font-bold text-blue-400 ml-1">TwitterRace</h1>
          <img
            src={icon}
            style={{
              width: "2rem",
              height: "2rem",
              // marginTop: "10px",
              marginLeft: "4px",
            }}
          />
        </div>
        <div role="status" style={{ marginTop: "20px" }}>
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-200 fill-blue-400"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <Header />
      <div className="flex flex-col items-center flex-1 p-5">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1 className="text-5xl font-bold text-blue-400">TwitterRace</h1>
          <img
            src={icon}
            style={{
              width: "6rem",
              height: "6rem",
              marginTop: "10px",
              marginLeft: "10px",
            }}
          />
        </div>
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
            profilePic={person1Pic}
          />
          <ProgressBar
            totalGoal={goal}
            currentValue={person2Followers}
            name={person2}
            profilePic={person2Pic}
          />
        </div>

        <h3 className="text-md md:text-lg  text-gray-500 text-center mt-5  ">
          {funMessage}
        </h3>

        <Button
          color="blue"
          className="mt-5"
          href={`https://twitter.com/intent/tweet?text=Check out this TwitterRace! ${window.location.href}`}
        >
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
      <img
        className="rounded-full w-16 h-16 bg-slate-500 mr-3 mt-2"
        src={profilePic}
      />

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
