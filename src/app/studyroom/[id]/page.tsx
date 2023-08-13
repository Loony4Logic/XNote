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

export default function Studyroom({ params }: { params: { id: string } }) {
  const [data, setData] = useState<any>();
  const [isLoading, setLoading] = useState(true);
  const supabase = createClientComponentClient();
  const playerRef = useRef<ReactPlayer>(null);
  const [play, setPlay] = useState<boolean>(false);
  const [value, setValue] = useState<string | undefined>("**Hello world!!!**");

  const syncData = debounce(async (data) => {
    const { error } = await supabase
      .from("studyroom")
      .update({ note: data })
      .eq("id", params.id);
    console.log("data sent");
    if (error) console.error(error);
  }, 10000);

  const handlePlayPause = () => {
    setPlay(!play);
  };

  useEffect(() => {
    async function getStudyroomData() {
      const { data, error } = await supabase
        .from("studyroom")
        .select()
        .eq("id", params.id);

      if (error) throw new Error("DED");
      if (data) {
        setData(data[0]);
        setValue(data[0]["note"]);
      }
      console.log(data[0]);
    }
    getStudyroomData();
  }, []);

  const handleSeek = (value: number) => {
    playerRef?.current && playerRef?.current?.seekTo(value, "seconds");
    setPlay(true);
  };

  return (
    <>
      {data ? (
        <div className="flex flex-col w-100 h-screen gap-2 m-2">
          <div className="flex flex-row h-1/2 gap-2">
            <div className="w-3/4">
              <Player
                url={data.videoURL}
                playerRef={playerRef}
                play={play}
                debug
              ></Player>
            </div>
            <div className="w-1/4 h-full">
              <TranscriptBox
                link={data.videoURL}
                duration={playerRef?.current?.getDuration() || 500}
                handleSeek={handleSeek}
                addTranscript={(text: string) => {
                  let newValue = `${value}\n> ${text} \n`;
                  setValue(newValue);
                }}
              />
            </div>
          </div>
          <div>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Notes:
            </h2>
            <hr />
            <br />
            <div>
              <Editor value={value} setValue={setValue} syncData={syncData} />
            </div>
          </div>
        </div>
      ) : (
        <LayoutSkeleton />
      )}
    </>
  );
}
