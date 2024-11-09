"use client"

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { logoutAction } from "@/actions/auth";

const Navbar = () => {
  const router = useRouter();
  const handleLogout = async () => { 
    await logoutAction(); 
    router.push("/login"); 
  };

  return (
    <header className="p-5">
      <div className="flex items-center justify-between rounded-md border-2 border-[#8E77DB] bg-[#313030] p-3 md:px-7">
        <div className="flex gap-x-2">
          <Image src="/diamond.svg" alt="logo" width={20} height={20} />
          <h1 className="bg-gradient-to-r from-[#F1E5FF] to-[#8E77DB] bg-clip-text text-base font-bold text-transparent md:text-xl">
            Questia
          </h1>
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
        {}
        <div>
          <Button onClick={handleLogout} style={{cursor:"pointer"}} className="font-semibold md:px-7" variant={"project"}>
            Log out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
