import Image from "next/image";
import Link from "next/link";

export default function MainHeader() {
  return (
    <nav className="flex items-center justify-between flex-wrap p-6 text-white bg-black">
      <div className="flex items-center flex-shrink-0">
        <Link className="font-semibold text-lg" href={"/"}>Better Spotify</Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link className="font-semibold text-lg" href={"/"}>Player</Link>
        <Link className="font-semibold text-lg" href={""}>Analytics</Link>
        <Link className="font-semibold text-lg" href={"/"}>Log In</Link>
      </div>
    </nav>
  );
}
