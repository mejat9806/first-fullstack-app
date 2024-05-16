import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcnComponent/ui/carousel";
import TextArea from "../homeUi/TextArea";
import PostFooter from "./PostFooter";

export interface PostItemType {
  item: {
    author: { name: string; _id: string; profileImage: string };
    createAt: string;
    detail: string;
    slug: string;
    title: string;
    _id: string;
    image: string[];
  };
}

const PostItem = ({ item }: PostItemType) => {
  const baseUrl = "http://localhost:8000/"; // Base URL of your Express server
  const imageUrl = baseUrl + "public/img/posts/" + item.image[0]; // Construct the full image URL

  console.log(imageUrl);
  if (!item) {
    return null; // or handle the case when item is undefined
  }
  const date = item.createAt;
  const postDay = new Date(date).toLocaleString("en-MY", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kuala_Lumpur",
  });
  console.log(item.image);
  return (
    <div className="p-2 bg-slate-200/30 rounded-2xl py-7 shadow-xl">
      <div className="w-full h-  flex gap-1 mb-3">
        <img src="/defaultUser.svg" className="h-10 w-10 rounded-full" />
        <div className="flex flex-col items-start justify-start ">
          <h1 className="text-lg font-semibold leading-3 mb-2">
            {item.author.name}
            <span className="font-light text-sm leading-3 ml-4">{postDay}</span>
          </h1>
          <TextArea text={item.detail} />
        </div>
      </div>
      <img src={baseUrl} alt="" />
      <div className="w-full flex justify-center items-center">
        {item.image[0] && (
          <div className="w-[200px]  md:w-[300px] transition-all duration-150">
            <Carousel>
              <CarouselContent>
                {item.image.map((img) => (
                  <CarouselItem key={img}>
                    <img
                      src={`${baseUrl}img/posts/${img}`}
                      alt={img}
                      className="rounded-2xl"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}
      </div>
      <div className="mt-5">
        <PostFooter />
      </div>
    </div>
  );
};

export default PostItem;

//add when people click show more open the page in the full page
// use input Text area for post input because it have \n it
