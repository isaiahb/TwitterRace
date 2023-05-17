import { Container } from "./Container";
// import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="py-3">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <a href="#" aria-label="Home" className="flex items-center">
              {/* <Logo className="h-8 w-auto pr-2 " /> */}
              <p className="font-bold text-gray-800 xs:text-xs md:text-xl">
              </p>
            </a>
          </div>
        </nav>
      </Container>
    </header>
  );
}
