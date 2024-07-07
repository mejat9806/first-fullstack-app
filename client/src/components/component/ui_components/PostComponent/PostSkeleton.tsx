import { Skeleton } from "@/shadcnComponent/ui/skeleton";

export const PostSkeleton = () => {
  return (
    <div className=" w-full  h-full flex flex-col justify-center">
      {/* <Skeleton className="p-3  rounded-2xl  shadow-md w-dvw md:max-w-2xl h-full bg " /> */}
      <div className=" rounded-2xl  shadow-md w-dvw md:max-w-xl mt-5">
        <Skeleton className="min-h-[700px] w-full p-3 rounded-2xl bg-slate-200" />
      </div>
    </div>
  );
};
