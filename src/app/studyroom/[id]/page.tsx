"use client";
import Editor from "@/components/Editor";
import Player from "@/components/Player";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import LayoutSkeleton from "@/components/LayoutSkeleton";

export default function studyroom({ params }: { params: { id: string } }) {
  const [data, setData] = useState<any>();
  const [isLoading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getStudyroomData() {
      const { data, error } = await supabase
        .from("studyroom")
        .select()
        .eq("id", params.id);

      if (error) throw new Error("DED");
      if (data) setData(data[0]);
      console.log(data[0]);
    }
    getStudyroomData();
  }, []);

  return (
    <>
      {data ? (
        <div className="flex flex-col w-100 h-screen gap-2 m-2">
          <div className="flex flex-row h-1/2 gap-2">
            <div className="w-3/4">
              <Player src="youtube.com"></Player>
            </div>
            <div className="w-1/4"></div>
          </div>
          <div className="h-1/2">
            <Editor />
          </div>
        </div>
      ) : (
        <LayoutSkeleton />
      )}
    </>
  );
}
