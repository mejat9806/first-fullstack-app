import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcnComponent/ui/carousel";
import TextArea from "../homeUi/TextArea";
import PostFooter from "./PostFooter";
import { dateFormat } from "@/utils/dateFormat";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { useNavigate } from "react-router-dom";

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
export const baseUrl = "http://localhost:8000/"; // Base URL of  Express server
const PostItem = ({ item }: PostItemType) => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  // const imageUrl = baseUrl + "public/img/posts/" + item.image[0]; // Construct the full image URL
  const postDay = dateFormat(item.createAt);
  if (!item) {
    return null; // or handle the case when item is undefined
  }

  return (
    <div
      className="p-2 bg-slate-200/90 rounded-2xl py-7 shadow-2xl"
      onClick={() => navigate(`post/${item._id}`)}
    >
      <div className="w-full h-  flex gap-1 mb-3">
        <img
          src={`${baseUrl}img/posts/${user?.profileImage}`}
          className="h-10 w-10 rounded-full"
          // change this
        />
        <div className="flex flex-col items-start justify-start w-full ">
          <h1 className="text-lg font-semibold leading-3 mb-2 flex flex-col">
            {item?.author?.name}
            <span className="font-light text-sm ">{postDay}</span>
          </h1>
          <h1 className="text-lg font-medium">{item.title}</h1>
          <TextArea text={item.detail} postID={item._id} />
        </div>
        {/* <div>
          <ThreeDotDropDown dropDownStuff={dropDownStuff} />
        </div> */}
      </div>
      <div className="w-full flex justify-center items-center">
        {item.image[0] && (
          <div className="w-[200px]  md:w-[300px] transition-all duration-150">
            <Carousel>
              <CarouselContent>
                {item.image.map((img) => (
                  <CarouselItem key={img}>
                    <img
                      src={`${baseUrl}/img/posts/${img}`}
                      alt={img}
                      className="rounded-2xl w-full h-full object-center"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {item.image.length > 1 && <CarouselPrevious />}
              {item.image.length > 1 && <CarouselNext />}
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
