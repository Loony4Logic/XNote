"use client";
import Navbar from "@/components/Navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <>
      <div className="flex flex-col p-2 place-content-center">
        <Navbar title="Loading..." />
        <div className="w-full h-[400px] place-content-center my-auto mx-auto">
          <img src="/loading.png" className="m-auto rocket" />
        </div>
      </div>
    </>
  );
}
