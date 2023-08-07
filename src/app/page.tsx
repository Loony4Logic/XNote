import { LoginCard } from "@/components/LoginCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  return (
    <>
      <div>
        <div className="flex flex-col p-2">
          {/* Header */}
          <div className="flex flex-row p-2 border-b-2">
            X notes - making your dreams come true
          </div>

          {/* Middle Content */}
          <Suspense
            fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}
          >
            <div className="flex flex-col">
              <div className="flex flex-row justify-around py-8">
                <div className="flex flex-row">
                  {/* <img
                    src="https://pps.whatsapp.net/v/t61.24694-24/347247517_221087780718195_3955007943297666736_n.jpg?ccb=11-4&oh=01_AdQa1zw9tJ3EGBT5aLUJSNb73TGLrTdu0aYmcBRV99SkxQ&oe=64DE4E00"
                    className="h-[400px]"
                  /> */}
                </div>
                <div className="flex flex-row">
                  <LoginCard />{" "}
                </div>
              </div>

              <div className="flex flex-row justify-center py-8 ">
                <p className="p-4 text-xl whitespace-pre-wrap font-bold bg-slate-100">
                  Nothing feels better than a satisfied customer, except maybe a
                  donut after a tough sales pitch – both leave you with a hole
                  that needs to be filled!
                </p>
              </div>
            </div>
          </Suspense>

          {/* Footer */}
          <div className="flex flex-row p-2 border-t-2">
            {" "}
            Here footer content will go{" "}
          </div>
        </div>
      </div>
    </>
  );
}
