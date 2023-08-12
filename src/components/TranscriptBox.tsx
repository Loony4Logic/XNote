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

type TimePoint = {
  text: string;
  time: string;
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
        className="flex gap-6 mx-2 items-center"
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
  data: TimePoint[];
  handleSeek: Function;
  addTranscript: Function;
}) {
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
            {props.data.map((v, i) => {
              return (
                <TranscriptTime
                  text={v.text}
                  time={v.time}
                  goto={(min: Number) => props.handleSeek(10 * i)}
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
