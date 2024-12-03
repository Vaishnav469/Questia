"use client"

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { logoutAction } from "@/actions/auth";

const Navbar = ({ role }: { role: string }) => {
  const router = useRouter();
  const handleLogout = async () => { 
    await logoutAction(); 
    router.push("/login"); 
  };

  return (
    <header className="p-5">
      <div className="flex justify-between items-center">
        {role === "student" && <Link
         href="/dashboard"
          
          className="flex flex-row items-center justify-center md:justify-start md:px-6 pt-12 pb-10 h-12 w-full"
        >
            <Image src="/diamond.svg" alt="logo" width={40} height={40} />
            <h1 className="bg-gradient-to-r from-[#F1E5FF] to-[#8E77DB] bg-clip-text text-base font-bold text-transparent md:text-3xl">
              Questia
            </h1>
        </Link>}
        
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
