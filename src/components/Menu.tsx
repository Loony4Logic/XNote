"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "./ui/button";
import {
  LayoutDashboard,
  Loader2,
  LogOut,
  Moon,
  MoonStar,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import Link from "next/link";

export default function Menu() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isloading, setIsLoading] = useState<boolean>(false);

  const handleSignOut = () => {
    setIsLoading(true);
    supabase.auth
      .signOut()
      .then((res) => {
        setIsLoading(false);
        router.push("/");
      })
      .catch((err) => console.log(err));

    setIsLoading(false);
  };
  return (
    <DropdownMenu dir="ltr">
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={"/dashboard"}>
            <Button variant={"link"}>
              <LayoutDashboard className="h-4 w-4 mx-1" /> Dashboard
            </Button>
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem>
          <Button
            variant={"link"}
            onClick={(e) => router.push("/studyroom/123")}
          >
            Study Room
          </Button>
        </DropdownMenuItem> */}
        <DropdownMenuItem>
          <Button variant={"link"} onClick={(e) => handleSignOut()}>
            {isloading ? (
              <Loader2 className="h-4 w-4 mx-1 spinloader" />
            ) : (
              <LogOut className="h-4 w-4 mx-1" />
            )}{" "}
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
