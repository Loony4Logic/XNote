"use client";
import { LoginCard } from "@/components/LoginCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Navbar from "@/components/Navbar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const features = [
  {
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="video">
        <path
          fill="#222"
          d="M51.83 8H12.17a10 10 0 0 0-10 10v28a10 10 0 0 0 10 10h39.66a10 10 0 0 0 10-10V18a10 10 0 0 0-10-10Zm-9.12 26.64-16.41 8.8a3 3 0 0 1-1.42.36 3 3 0 0 1-3-3V23.2a3 3 0 0 1 4.42-2.64l16.41 8.8a3 3 0 0 1 0 5.28Zm-16.83-9.77L39.17 32l-13.29 7.13Z"
        ></path>
      </svg>
    ),
    name: "Learn from video",
    description: "Watch video with distracation. put URL and get started.",
  },
  {
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        data-name="Layer 1"
        viewBox="0 0 24 24"
        id="study-notes"
      >
        <path d="M16,14H8a1,1,0,0,0,0,2h8a1,1,0,0,0,0-2Zm0-4H10a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Zm4-6H17V3a1,1,0,0,0-2,0V4H13V3a1,1,0,0,0-2,0V4H9V3A1,1,0,0,0,7,3V4H4A1,1,0,0,0,3,5V19a3,3,0,0,0,3,3H18a3,3,0,0,0,3-3V5A1,1,0,0,0,20,4ZM19,19a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V6H7V7A1,1,0,0,0,9,7V6h2V7a1,1,0,0,0,2,0V6h2V7a1,1,0,0,0,2,0V6h2Z"></path>
      </svg>
    ),
    name: "Notes",
    description:
      "Take notes while watching the video. markdown support for editor lets you take notes with ease and beautie.",
  },
  {
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        data-name="Layer 1"
        viewBox="0 0 24 24"
        id="no-money"
      >
        <path d="M6,11a1,1,0,1,0,1,1A1,1,0,0,0,6,11Zm5.86-1.55h0L4.71,2.29A1,1,0,0,0,3.29,3.71L4.59,5H4A3,3,0,0,0,1,8v8a3,3,0,0,0,3,3H18.59l2.7,2.71a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Zm-.74,2.09,1.34,1.34A1,1,0,0,1,12,13a1,1,0,0,1-1-1A1,1,0,0,1,11.12,11.54ZM4,17a1,1,0,0,1-1-1V8A1,1,0,0,1,4,7H6.59l3.1,3.1A3,3,0,0,0,9,12a3,3,0,0,0,3,3,3,3,0,0,0,1.9-.69L16.59,17ZM20,5H12.66a1,1,0,0,0,0,2H20a1,1,0,0,1,1,1v7.34a1,1,0,1,0,2,0V8A3,3,0,0,0,20,5Zm-1,7a1,1,0,1,0-1,1A1,1,0,0,0,19,12Z"></path>
      </svg>
    ),
    name: "No mopney required",
    description: "Well its free of cost!! what else you look for ??",
  },
];

export default function Home() {
  return (
    <>
      <div>
        <div className="flex flex-col p-2">
          {/* Header */}
          <Navbar title={"Home"} />

          {/* Middle Content */}

          <div className="container flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center py-8">
              <div className="flex flex-row">
                <img
                  src={"/learning.svg"}
                  alt="learning digitally"
                  width={"70%"}
                  className="mx-auto"
                />
              </div>
              <div className="flex flex-row">
                <LoginCard />{" "}
              </div>
            </div>

            <section
              id="features"
              className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
            >
              <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-4xl">
                  Features
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-md sm:leading-7">
                  List of features we provide
                </p>
              </div>
              <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                {features.map((feature, index) => (
                  <div
                    key={`feature_${index}`}
                    className="relative overflow-hidden rounded-lg border bg-background p-2"
                  >
                    <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                      {feature.svg}
                      <div className="space-y-2">
                        <h3 className="font-bold">{feature.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mx-auto text-center md:max-w-[58rem]">
                <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7"></p>
              </div>
            </section>

            <section
              id="features"
              className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
            >
              <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                <h2 className="font-heading text-2xl leading-[1.1] sm:text-3xl md:text-4xl">
                  Demo
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-md sm:leading-7">
                  <a href="/example">Try it yourself</a>
                  <img src="/demo.jpg"></img>
                </p>
              </div>
              <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3"></div>
              <div className="mx-auto text-center md:max-w-[58rem]">
                <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7"></p>
              </div>
            </section>
          </div>

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
