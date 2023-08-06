import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <Link href={"/studyroom/123"}>
      <Button>Click this</Button>
    </Link>
  );
}
