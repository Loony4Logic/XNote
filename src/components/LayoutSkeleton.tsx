import { Skeleton } from "./ui/skeleton";

export default function LayoutSkeleton() {
  return (
    <div className="flex flex-col w-100 h-screen gap-2 m-2">
      <div className="flex flex-row h-1/2 gap-2">
        <Skeleton className="w-3/4"></Skeleton>
        <Skeleton className="w-1/4"></Skeleton>
      </div>
      <div className="h-1/2">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Notes:
        </h2>
        <hr />
        <br />
        <Skeleton className="h-full" />
      </div>
    </div>
  );
}
