'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { TEACHER_SIDENAV_ITEMS } from '@/lib/teacherconstants';
import { SideNavItem } from '@/lib/types';
import { Icon } from '@iconify/react';
import Image from "next/image";


const TeacherSideNav = ({ uid }: { uid: string }) => {
  return (
    <div className="md:w-60 h-screen flex-1 bg-[#313030] fixed border-r border-zinc-200 hidden md:flex">
      <div className="flex flex-col space-y-6 w-full">
        <Link
         href={uid ? "/dashboard" : "/"}
          
          className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 pt-12 pb-10 h-12 w-full"
        >
            <Image src="/diamond.svg" alt="logo" width={40} height={40} />
            <h1 className="bg-gradient-to-r from-[#F1E5FF] to-[#8E77DB] bg-clip-text text-base font-bold text-transparent md:text-3xl">
              Questia
            </h1>
        </Link>
          {TEACHER_SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} uid={uid}/>;
          })}
      </div>
    </div>
  );
};

export default TeacherSideNav;

const MenuItem = ({ item, uid }: { item: SideNavItem,  uid: string }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
        <Link
          href={`${item.path}/?teacherUid=${uid}`}
          className={`flex flex-row space-x-2 items-center p-2 rounded-lg hover:bg-stone-800 ${
            item.path === pathname ? 'bg-stone-800' : ''
          }`}
        >
          {item.icon}
          <span className="font-semibold text-xl flex">{item.title}</span>
        </Link>
    </div>
  );
};
