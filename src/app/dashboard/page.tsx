"use client";

import Menu from "@/components/Menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@radix-ui/react-label";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Car, Eye, Plus, RocketIcon, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import Navbar from "@/components/Navbar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

type StudyRoomCardProps = {
  studyRoom: any;
  viewStudyRoomHandler: (studyRoom: any) => void;
  deleteStudyRoomHandler: (studyRoom: any) => void;
};
const StudyRoomCard = ({
  studyRoom,
  viewStudyRoomHandler,
  deleteStudyRoomHandler,
}: StudyRoomCardProps) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="truncate">
          {studyRoom?.title ? `📝 ${studyRoom?.title}` : " 📝 Study Room "}
        </CardTitle>
        <CardDescription className="truncate mt-2">
          {studyRoom?.created_at &&
            dayjs(studyRoom.created_at).format("DD/MM/YYYY")}
        </CardDescription>
        <CardDescription className="truncate">
          {studyRoom?.id && `ID : ${studyRoom?.id}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <p className="line-clamp-3 text-color-slate-500">
            {studyRoom?.description && studyRoom?.description}
          </p>

          <p className="truncate space-x-0.5 text-base italic">
            <a
              href={studyRoom?.videoURL}
              target="_blank"
              className="text-blue-500 underline"
            >
              {studyRoom?.videoURL}
            </a>
          </p>
          <p className="line-clamp-2 space-x-0.5 space-y-0.5">
            {studyRoom?.tags &&
              studyRoom?.tags?.split(",").map((tag: any, index: number) => (
                <Badge variant={"secondary"} key={`tag_${index}`}>
                  {tag}
                </Badge>
              ))}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"}>
              <Trash className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                data
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  deleteStudyRoomHandler(studyRoom);
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Link href={`/studyroom/${studyRoom?.id}`}>
          <Button>
            <Eye className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default function Dashboard() {
  const [studyRooms, setStudyRooms] = useState<any>();
  //   const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addUrl, setAddUrl] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [tags, setTags] = useState<string>();
  const { toast } = useToast();
  const supabase = createClientComponentClient();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const getStudyRoomData = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.from("studyroom").select();

        if (data) setStudyRooms(data);
        if (error) throw new Error(error.message);
      } catch (error: any) {
        console.error(error);
        if (error instanceof Error)
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error.message,
          });
      }
      setIsLoading(false);
    };

    getStudyRoomData();
    console.log(URL);
  }, [refresh]);

  const createStudyRoomHandler = async () => {
    setIsLoading(true);
    try {
      if (!addUrl) {
        throw new Error("Please add a url");
      } else if (!title) {
        throw new Error("Please add a title");
      } else {
        const { data, error } = await supabase
          .from("studyroom")
          .insert([{ videoURL: addUrl, title: title, tags: tags }]);

        if (error) throw new Error(error?.message);

        setRefresh(!refresh);
        setOpen(false);
      }
    } catch (error: any) {
      if (error instanceof Error)
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.message,
        });
    }
    setIsLoading(false);
  };
  const deleteStudyRoomHandler = async (studyRoom: any) => {
    setIsLoading(true);
    try {
      if (!studyRoom?.id) throw new Error("Please provide id");

      const { data, error } = await supabase
        .from("studyroom")
        .delete()
        .eq("id", studyRoom?.id);

      setRefresh(!refresh);
    } catch (error: any) {
      if (error instanceof Error)
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.message,
        });
    }

    setIsLoading(false);
  };
  const viewStudyRoomHandler = (studyRoom: any) => {
    try {
      if (!studyRoom?.id) throw new Error("Please provide id");
      router.push(`/studyroom/${studyRoom?.id}`);
    } catch (error: any) {
      if (error instanceof Error)
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.message,
        });
    }
  };

  const router = useRouter();
  return (
    <>
      <div>
        <div className="flex flex-col p-2">
          <Navbar title={"Dashboard"} />

          <div className="grid grid-cols-1 gap-8 px-[10%] pt-8">
            <div
              id="dashbaord-content-header"
              className="grid grid-cols-3 justify-around"
            >
              <div className="flex flex-row items-center gap-x-2">
                <span className="font-semibold">Study Rooms</span>
                <Separator orientation="vertical" />
                <Badge>{studyRooms?.length ? studyRooms.length : 0}</Badge>
              </div>

              <div className="flex flex-row items-center justify-center gap-x-2">
                <Input
                  value={addUrl}
                  onChange={(e) => setAddUrl(e.target.value)}
                  type="search"
                  placeholder="Enter the url to add new video"
                />
              </div>

              <div className="flex flex-row items-center justify-end gap-x-2">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="rounded-full h-[70%]"
                      onClick={(e) => setOpen(true)}
                    >
                      <Plus className="w-4 h-4 mr-1" /> Add
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] md:max-w-[50%]">
                    <DialogHeader>
                      <DialogTitle>Video Details</DialogTitle>
                      <DialogDescription>
                        {
                          "Add Video details . Video URL supports youtube, facebook , soundcloud , mp4 , etc"
                        }
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-1 items-start gap-2">
                        <Label htmlFor="title" className="text-left">
                          Title
                        </Label>
                        <Input
                          required
                          id="title"
                          name="title"
                          value={title}
                          className="col-span-3"
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Title of study room"
                        />
                      </div>
                      <div className="grid grid-cols-1 items-start gap-2">
                        <Label htmlFor="url" className="text-left">
                          URL
                        </Label>
                        <Input
                          required
                          id="url"
                          name="url"
                          value={addUrl}
                          className="col-span-3"
                          onChange={(e) => setAddUrl(e.target.value)}
                          placeholder="Youtube , Facebook , mp4 , etc video link"
                        />
                      </div>
                      <div className="grid grid-cols-1 items-start gap-2">
                        <Label htmlFor="tags" className="text-left">
                          Tags
                        </Label>
                        <Input
                          id="tags"
                          name="tags"
                          value={tags}
                          className="col-span-3"
                          onChange={(e) => setTags(e.target.value)}
                          placeholder="Add ',' separated tags . Ex : #code,#food,#trending"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        onClick={async (e) => {
                          await createStudyRoomHandler();
                        }}
                        type="submit"
                      >
                        Add
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            {isLoading && <Skeleton className="w-[100%] h-[50vh]" />}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 ">
              {!isLoading &&
                studyRooms?.length >= 1 &&
                studyRooms?.map((studyRoom: any, index: number) => {
                  return (
                    <>
                      <StudyRoomCard
                        key={`sc_${index}`}
                        studyRoom={studyRoom}
                        viewStudyRoomHandler={viewStudyRoomHandler}
                        deleteStudyRoomHandler={deleteStudyRoomHandler}
                      />
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
