import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="bg-slate-200">
      <Container>
        <div className="flex flex-col items-center py-2 sm:flex-row-reverse justify-center ">
          <p className="text-slate-700 ">
            Built by <span className="text-blue-500"><a href="https://twitter.com/IsaiahBallah">@IsaiahBallah</a></span>{" & "}
            <span className="text-blue-500"><a href="https://twitter.com/JakeBildy">@JakeBildy</a></span>. Inspired by{" "}
            <span className="text-blue-500"><a href="https://twitter.com/JakeDuth">@JakeDuth</a>.</span>
            {" "}Made on a Plane ✈️ &copy; {new Date().getFullYear()}
          </p>
        </div>
      </Container>
    </footer>
  );
}
