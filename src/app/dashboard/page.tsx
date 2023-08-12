"use client";

import Menu from "@/components/Menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  return (
    <div>
      This is your Dashboard.
      <Menu />
    </div>
  );
}
