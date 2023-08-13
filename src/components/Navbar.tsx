"use client";
import { Separator } from "@radix-ui/react-separator";
import Menu from "./Menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { useTheme } from "next-themes";
import { Moon, Sun, SunMoon } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar({ title }: { title: string }) {
  const { setTheme, theme } = useTheme();
  const renderThemeIcon = () => {
    if (theme === "system") return <SunMoon />;
    else if (theme === "dark") return <Moon />;
    else return <Sun />;
  };
  return (
    <div className="flex flex-row items-center justify-between border-b py-2 px-[5%] drop-shadow-md">
      <div className="flex flex-row items-center gap-x-4">
        <div className="text-2xl font-semibold">🚀 XNote</div>
        <div className="text-xl  text-slate-300 ">|</div>
        <div className="text-xl text-slate-500 dark:text-slate-400 underline">
          {title}
        </div>
      </div>

      <div className="flex flex-row items-center gap-x-4">
        <Button
          className="rounded-full"
          variant="ghost"
          onClick={() => {
            if (theme === "system") setTheme("dark");
            if (theme === "dark") setTheme("light");
            if (theme === "light") setTheme("dark");
          }}
        >
          {" "}
          {renderThemeIcon()}
        </Button>
        <Menu />
      </div>
    </div>
  );
}
