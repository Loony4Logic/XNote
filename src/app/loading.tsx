import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <>
      <div className="w-full h-[400px] place-content-center">
        <img src="/loading.gif" className="m-auto" />
      </div>
    </>
  );
}
