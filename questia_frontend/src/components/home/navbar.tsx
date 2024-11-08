import Image from "next/image";
import Link from "next/link";

import { Avatar, AvatarFallback } from "../ui/avatar";

import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <header className="p-5">
      <div className="flex items-center justify-between rounded-md border-2 border-[#8E77DB] bg-[#313030] p-3 md:px-7">
        <div className="flex gap-x-2">
          <Image src="/diamond.svg" alt="logo" width={20} height={20} />
          <h1 className="text-base font-bold md:text-xl">Questia</h1>
        </div>
        <Image
          className="hidden md:block"
          src="/navgif.gif"
          alt="gif"
          width={70}
          height={70}
        />
        {/* <Avatar className="cursor-pointer">
          <AvatarFallback>Q</AvatarFallback>
        </Avatar> */}
        <div>
          <Button className="font-semibold md:px-7" variant={"project"}>
            <Link href={"/login"}>Log In</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;