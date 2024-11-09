"use client";

import { Button } from "@/components/ui/button";
import { Room } from "@/lib/types";
import React, { useState } from "react";
import RoomsList from "@/components/rooms-list";
import { Input } from "@/components/ui/input";

const rooms: Room[] = [
    {
      id: 1,
      name: "Physics Fundamentals Quiz 1",
      description:
        "Test students on basic concepts in physics, including motion and energy",
      code: "PHYSICS1",
    },
    {
      id: 2,
      name: "Chemistry Fundamentals Quiz 1",
      description:
        "Test students on basic concepts in chemistry, including atoms and molecules",
      code: "CHEMISTRY1",
    },
    {
      id: 3,
      name: "Chemistry Fundamentals Quiz 1",
      description:
        "Test students on basic concepts in chemistry, including atoms and molecules",
      code: "CHEMISTRY1",
    },
    {
      id: 4,
      name: "Chemistry Fundamentals Quiz 1",
      description:
        "Test students on basic concepts in chemistry, including atoms and molecules",
      code: "CHEMISTRY1",
    },
    {
      id: 5,
      name: "Chemistry Fundamentals Quiz 1",
      description:
        "Test students on basic concepts in chemistry, including atoms and molecules",
      code: "CHEMISTRY1",
    },
    {
      id: 6,
      name: "Chemistry Fundamentals Quiz 1",
      description:
        "Test students on basic concepts in chemistry, including atoms and molecules",
      code: "CHEMISTRY1",
    },
    {
      id: 7,
      name: "Chemistry Fundamentals Quiz 1",
      description:
        "Test students on basic concepts in chemistry, including atoms and molecules",
      code: "CHEMISTRY1",
    },
    {
      id: 8,
      name: "Chemistry Fundamentals Quiz 1",
      description:
        "Test students on basic concepts in chemistry, including atoms and molecules",
      code: "CHEMISTRY1",
    },
  ];


const FormsListPage = () => {
    const [code, setCode] = useState<string>("");
    return (
        <div>
            {rooms.length === 0 ? 
                (<div className="flex flex-col items-center justify-center">
                <h1  className="text-3xl py-20" >Hi Name!</h1>
                <h1 className="text-3xl font-bold">Join A ClassRoom</h1>
                <div className="m-5 justify-center text-center items-center rounded-xl border-2 border-[#8E77DB] bg-[#313030] px-5 pt-7 pb-16 md:px-32">
                    <h1>Enter the Room code provided by your teacher to join the classroom</h1>
                    <div className="rounded-xl p-px pt-7">
                        <div className="gap-y-12 rounded-xl p-0.5 bg-gradient-to-r from-[#F1E5FF] to-[#8E77DB]">
                            <div className=" bg-[#313030] rounded-xl p-0">
                                <Input
                                type="email"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Enter the Classroom Code here"
                                className="text-sm text-[#B3B3B3] bg-transparent focus:outline-none border-none outline-none h-[60]"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex px-12 gap-x-2 pb-5 pt-5">
                        <a href="#" className="text-blue-500" >💡Please read the instructions clearly.</a>
                        <h1> Best of Luck!</h1>
                    </div>
                    
                    <Button
                        variant={"project"}
                        size={"lg"}
                        className="mt-5 border-2 border-[#D9D9D9] font-semibold items-center"
                    >
                        Join Room
                    </Button>
                </div>
            </div> ) :
            (<div className="mx-auto flex flex-col bg-[#313030] px-5 py-10 md:px-16 w-[175vh] border-2 border-[#8E77DB] max-h-[88.7vh] pt-10 overflow-scroll">
                 <div className="w-full pb-12 text-center text-[#FFFFFF]">
                    <h1 className="text-3xl font-bold">Your ClassRooms</h1>
                </div>
                <RoomsList rooms={rooms} role="Student" />
            </div>)
            }
        </div>
    );
};

export default FormsListPage;
