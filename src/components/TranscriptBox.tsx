import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(duration);
dayjs.extend(customParseFormat);

type TimePoint = {
  text: string;
  duration: number;
  offset: number;
};

function TranscriptTime({
  text,
  time,
  goto,
  addTranscript,
}: {
  text: string;
  time: string;
  goto: Function;
  addTranscript: Function;
}) {
  return (
    <>
      <div
        className="flex gap-6 m-2 items-center"
        onClick={() => {
          goto();
          addTranscript(text);
        }}
      >
        <Badge variant="secondary">{time}</Badge>
        <span>{text}</span>
      </div>
      <hr />
    </>
  );
}

export default function TranscriptBox(props: {
  link: string;
  duration: number;
  handleSeek: Function;
  addTranscript: Function;
}) {
  const [transcriptData, setTranscriptionData] = useState<TimePoint[]>([]);

  useEffect(() => {
    async function getTranscription() {
      let data = await fetch(`/api/v1/get_transcript?link=${props.link}`).then(
        (res) => res.json()
      );
      if (!data.length) {
        data = [];
        for (let i = 0; i < props.duration; i += 10) {
          data.push({
            text: "Add note here",
            offset: i * 1000,
            duration: 10000,
          });
        }
      }
      setTranscriptionData(data);
    }
    getTranscription();
  }, []);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Transcript</CardTitle>
        <CardDescription>
          Click on time to go to time in video. Click on text to mention in
          Editor
        </CardDescription>
      </CardHeader>
      <CardContent className="h-4/6">
        <ScrollArea className="h-full rounded-md border p-4">
          <div className="flex flex-col gap-1">
            {transcriptData.map((v, i) => {
              return (
                <TranscriptTime
                  key={i}
                  text={v.text}
                  time={dayjs.duration(v.offset, "ms").format("HH:mm:ss")}
                  goto={() =>
                    props.handleSeek(dayjs.duration(v.offset).asSeconds())
                  }
                  addTranscript={(text: string) => {
                    props.addTranscript(text);
                  }}
                />
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
