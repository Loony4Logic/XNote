import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { FileCheck2, FileX2 } from "lucide-react";

type StudyroomNavitemsProps = {
  title: string;
  videoURL: string;
  description: string;
  syncStatus: boolean;
};

export default function StudyroomNavitems({
  title,
  videoURL,
  description,
  syncStatus,
}: StudyroomNavitemsProps) {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="text-xl text-slate-500 dark:text-slate-400 underline">
            {title}
          </TooltipTrigger>
          <TooltipContent>
            <Card>
              <CardHeader>
                <CardTitle>StudyRoom: {title}</CardTitle>
                <CardDescription>Description: {description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="m-2">
                  Video URL: <label>{videoURL}</label>
                </p>
                <p className="m-2">
                  Status: <label> {syncStatus ? "saved" : "Not Saved"} </label>{" "}
                </p>
              </CardContent>
            </Card>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {syncStatus ? (
              <FileCheck2 color="#00ff00" />
            ) : (
              <FileX2 color="#ff0000" />
            )}
          </TooltipTrigger>
          <TooltipContent>{syncStatus ? "Saved" : "Not saved"}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
