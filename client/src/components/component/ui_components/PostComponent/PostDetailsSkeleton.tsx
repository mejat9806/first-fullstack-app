import { Skeleton } from "@/shadcnComponent/ui/skeleton";

export const PostDetailsSkeleton = ({
  skeletonType,
}: {
  skeletonType: "postDetail" | "relevant";
}) => {
  if (skeletonType === "relevant")
    return (
      <div className=" lg:flex flex-col md:flex-row  hidden">
        <Skeleton className="rounded-md  gap-4  h-[200px]  md:w-[450px] " />
      </div>
    );
  return (
    <div className=" flex flex-col md:flex-row  w-full justify-center items-center">
      <Skeleton className="rounded-md  gap-4  h-[400px] md:h-[500px] w-[550px] md:w-[750px] lg:w-[600px] " />
    </div>
  );
};
