"use client";
import Editor from "@/components/Editor";
import Player from "@/components/Player";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useRef, useState } from "react";
import LayoutSkeleton from "@/components/LayoutSkeleton";
import TranscriptBox from "@/components/TranscriptBox";
import ReactPlayer from "react-player";
import { debounce } from "lodash";
import Navbar from "@/components/Navbar";
import { FileCheck2, FileX2 } from "lucide-react";
import StudyroomNavitems from "@/components/StudyroomNavitems";

export default function Studyroom({ params }: { params: { id: string } }) {
  const [data, setData] = useState<any>({
    title: "you here to rick roll",
    description:
      "you can now learn from video and make notes simultenously. Thats soooooo cool mann!!.You should make a account or atleast give me a star: here is the link----> https://github.com/Loony4Logic/XNote",
    videoURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  });
  const [isLoading, setLoading] = useState(true);
  const [isSync, setIsSync] = useState(true);
  const supabase = createClientComponentClient();
  const playerRef = useRef<ReactPlayer>(null);
  const [play, setPlay] = useState<boolean>(false);
  const [value, setValue] = useState<string | undefined>("**Hello world!!!**");

  const syncData = debounce(async (data) => {
    console.log("Well you see you don't have a account here.");
    console.log("Its free still you don't want to login :(");
    console.log("you should support open source");
    console.log("or atleast give star to project on github.");
    console.log(
      "Here is a link for you------> https://github.com/Loony4Logic/XNote"
    );
    setIsSync(true);
  }, 1000);

  const handlePlayPause = () => {
    setPlay(!play);
  };

  const handleSeek = (value: number) => {
    playerRef?.current && playerRef?.current?.seekTo(value, "seconds");
    setPlay(true);
  };

  return (
    <>
      <Navbar
        title=""
        navItems={
          <StudyroomNavitems
            title={data?.title || "StudyRoom"}
            description={data?.description || ""}
            videoURL={data?.videoURL}
            syncStatus={isSync}
          />
        }
      />
      {data ? (
        <div className="flex flex-col w-100 h-screen gap-6 m-4">
          <div className="flex flex-row h-1/2 gap-2">
            <div className="w-4/6">
              <Player
                url={data.videoURL}
                playerRef={playerRef}
                play={play}
              ></Player>
            </div>
            <div className="w-2/6 h-full">
              <TranscriptBox
                link={data.videoURL}
                duration={playerRef?.current?.getDuration() || 500}
                handleSeek={handleSeek}
                addTranscript={(text: string) => {
                  let newValue = `${value}\n> ${text} \n`;
                  setValue(newValue);
                  setIsSync(false);
                }}
              />
            </div>
          </div>
          <div>
            <Editor
              value={value}
              setValue={(val: string) => {
                setValue(val);
                setIsSync(false);
              }}
              syncData={syncData}
            />
          </div>
        </div>
      ) : (
        <LayoutSkeleton />
      )}
    </>
  );
}
