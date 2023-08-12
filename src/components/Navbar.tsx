"use client";
import { Separator } from "@radix-ui/react-separator";
import Menu from "./Menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";

export default function Navbar({ title }: { title: string }) {
  return (
    <div className="flex flex-row items-center justify-between border-b py-2 px-[5%]">
      <div className="flex flex-row items-center gap-x-4">
        <div className="text-2xl font-semibold">🚀 XNote</div>
        <div className="text-xl  text-slate-300 ">|</div>
        <div className="text-xl text-slate-500 underline">{title}</div>
      </div>

      <div className="flex flex-row items-center">
        <Menu />
      </div>
    </div>
  );
}
