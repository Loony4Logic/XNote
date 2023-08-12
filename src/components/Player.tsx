"use client";
import { RefObject, useEffect, useRef, useState } from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player/lazy";
import { Input } from "@/components/ui/input";
import { OnProgressProps } from "react-player/base";
import { setInterval } from "timers";
import { Button } from "./ui/button";

type debugValueType = {
  // isReady?:boolean,
  // isStart?:boolean,
  // isPlay?:boolean,
  // isPause?:boolean,
  // isSeek?:boolean,
  // isEnd?:boolean,
  isError?: boolean;
  progress?: OnProgressProps;
  durationFromCallback?: string | number;
  error?: any;
  duration?: string | number;
  currentTime?: string | number;
};

interface PlayerProps {
  url: string;
  playerRef: RefObject<ReactPlayer>;
  play: boolean;
  debug?: boolean;
}

// uncontrolled component -> need to discuss if it needs to be controlled or uncontrolled
// debugValue logic has some bugs , only for testing for now
const Player = ({ url, playerRef, debug, play }: PlayerProps) => {
  // const playerRef = useRef<ReactPlayer>(null);
  const [debugValues, setDebugValues] = useState<debugValueType>();

  const ReactPlayerInitialize: ReactPlayerProps = {
    playing: play,
    controls: true,
    width: "100%",
    height: "100%",
    fallback: <p>Loading</p>,
    onError: (error: any) => {
      setDebugValues({ ...debugValues, error: error });
    },
    onProgress: (state: OnProgressProps) => {
      setDebugValues({ ...debugValues, progress: state });
    },
    onDuration: (duration: number) => {
      setDebugValues({ ...debugValues, durationFromCallback: duration });
    },
  };

  return (
    <>
      <div id="player-container" className="h-full">
        <ReactPlayer ref={playerRef} url={url} {...ReactPlayerInitialize} />

        {/* <Button onClick={handlePlayPause}>Play/Pause</Button>
        {[0, 1, 3, 5, 7, 9, 10, 13, 15, 12, 20].map(
          (seconds: number, index: number) => {
            return (
              <Button key={index} onClick={() => handleSeek(seconds)}>
                {seconds}
              </Button>
            );
          }
        )} */}

        {debug && <pre>{JSON.stringify(debugValues, null, 4)}</pre>}
        {debug && (
          <pre>currentTime : {playerRef?.current?.getCurrentTime()}</pre>
        )}
      </div>
    </>
  );
};

export default Player;
