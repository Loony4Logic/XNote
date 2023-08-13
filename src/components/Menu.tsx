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
import { LayoutDashboard, LogOut, Moon, MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Menu() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignOut = () => {
    supabase.auth
      .signOut()
      .then((res) => {
        router.push("/");
      })
      .catch((err) => console.log(err));
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
          <Button variant={"link"} onClick={(e) => router.push("/dashboard")}>
            <LayoutDashboard className="h-4 w-4 mx-1" /> Dashboard
          </Button>
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
            <LogOut className="h-4 w-4 mx-1" /> Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
