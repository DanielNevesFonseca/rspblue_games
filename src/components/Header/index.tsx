import Link from "next/link";
import logoImage from "/public/logo.svg";
import Image from "next/image";
import { LiaGamepadSolid } from "react-icons/lia";

const Header = () => {
  return (
    <header className="w-full h-28 bg-slate-100 text-black px-2">
      <div className="max-w-screen-xl mx-auto flex justify-center items-center h-28 sm:justify-between">
        <nav className="flex flex-col gap-1 items-center justify-center sm:flex-row sm:gap-4">
          <Link href={"/"}>
            <Image
              src={logoImage}
              alt="logo da rspblue games"
              quality={100}
              priority={true}
            />
          </Link>

          <Link href={"/"}>Games</Link>

          <Link href={"/profile"}>Perfil</Link>
        </nav>

        <div className="hidden sm:flex justify-center items-center">
          <Link href="/profile">
            <LiaGamepadSolid size={34} color="#475569" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
