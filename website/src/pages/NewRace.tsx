import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { TextField } from "../components/Fields";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import icon from "../../src/images/birds.png";

export default function NewPage() {
  const [person1, setPerson1] = useState("");
  const [person2, setPerson2] = useState("");
  const [goal, setGoal] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!!person1 && !!person2 && !!goal) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [person1, person2, goal]);

  return (
    <div className="flex flex-col h-screen bg-slate-100">
      <Header />
      <div className="flex flex-col items-center flex-1">
        <div
          style={{ display: "flex", alignItems: "center" }}
          className={"mt-10"}
        >
          <h1 className="text-4xl font-bold text-gray-800">
            Challenge Someone to a{" "}
          </h1>
          <h1 className="text-4xl font-bold text-blue-400 ml-2">TwitterRace</h1>
          <img
            src={icon}
            style={{
              width: "3rem",
              height: "3rem",
              // marginTop: "10px",
              marginLeft: "4px",
            }}
          />
        </div>
        <p className="text-gray-600 mt-3 font-semibold">
          Built by{" "}
          <span className="text-blue-400">
            <a href="https://twitter.com/IsaiahBallah">@IsaiahBallah</a>
          </span>
          {" & "}
          <span className="text-blue-400">
            <a href="https://twitter.com/JakeBildy">@JakeBildy</a>
          </span>
          . Inspired by{" "}
          <span className="text-blue-400">
            <a href="https://twitter.com/JakeDuth">@JakeDuth</a>
          </span>
        </p>

        {/* Inputs */}
        <div className=" w-72 flex flex-col justify-center my-5">
          <TextField
            label="Person #1"
            className=" w-full"
            placeholder="@IsaiahBallah"
            value={person1}
            onChange={(e: any) => setPerson1(e.target.value)}
          />
          <TextField
            label="Person #2"
            className=" w-full"
            placeholder="@JakeBildy"
            value={person2}
            onChange={(e: any) => setPerson2(e.target.value)}
          />
          <TextField
            label="Goal (Number of Followers)"
            className=" w-full"
            type="number"
            placeholder="100"
            value={goal}
            onChange={(e: any) => setGoal(e.target.value)}
          />
          <Button
            color="blue"
            className="mt-5"
            disabled={!isComplete}
            href={`/${person1.replaceAll("@", "")}-vs-${person2.replaceAll(
              "@",
              ""
            )}-to-${goal}`}
          >
            Start TwitterRace
          </Button>
          {/* {!isComplete && <p>Must complete form to create a TwitterRace</p>} */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
