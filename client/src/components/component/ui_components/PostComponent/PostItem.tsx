import TextArea from "../homeUi/TextArea";
import PostFooter, { Ilike } from "./PostFooter";
import { dateFormat } from "@/utils/dateFormat";

import { useNavigate } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useTheme } from "@/components/darkMode/theme-provider";
import { HoverCard, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { HoverCardContent } from "@/shadcnComponent/ui/hover-card";
import HoverCardUI from "../../hoverCard/HoverCardUI";
import { Button } from "@/shadcnComponent/ui/button";
import LoadingPage from "../LoadingPage";

export interface PostItemType {
  author: { name: string; _id: string; profileImage: string };
  createAt: string;
  detail: string;
  slug: string;
  title: string;
  _id: string;
  image: string[];
  likesCount: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  likes: any[];
  id: string;
}
interface item {
  item: PostItemType;
}
export const baseUrl = "http://localhost:8000/"; // Base URL of  Express server
const PostItem = ({ item }: item) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  // const imageUrl = baseUrl + "public/img/posts/" + item.image[0]; // Construct the full image URL
  const postDay = dateFormat(item.createAt);
  if (!item) {
    return <LoadingPage />; // or handle the case when item is undefined
  }
  const profileImage = `${baseUrl}img/posts/${
    item.author?.profileImage ?? item.author?.profileImage //return leftside if it not null/undefiend .if null/undifined it will return the right
  }`;

  console.log(item, "item check");
  return (
    <div
      className={` ${
        theme === "dark"
          ? "text-white  hover:bg-slate-700  border-2 border-slate-100"
          : "text-black  hover:bg-slate-200"
      } p-5  rounded-2xl   shadow-2xl `}
    >
      <div className="w-full  flex gap-1 mb-3 ">
        <HoverCard>
          <HoverCardTrigger>
            <img
              src={profileImage}
              className="h-12 w-12 rounded-full cursor-pointer "
              // change this
              onClick={() => navigate(`/profile/${item.author._id}`)}
            />
          </HoverCardTrigger>
          <HoverCardContent className="m-0 absolute -top-20 -left-20">
            <HoverCardUI userId={item.author?._id} />
          </HoverCardContent>
        </HoverCard>
        <div
          className="flex flex-col items-start justify-start w-full "
          onClick={() => navigate(`/post/${item._id}`, { replace: true })}
        >
          <h1 className="text-lg font-semibold leading-3 mb-2 flex flex-col">
            {item?.author?.name}
            <span className="font-light text-sm ">{postDay}</span>
          </h1>
          <h1 className="text-lg font-medium">{item.title}</h1>
          <TextArea text={item.detail} postID={item._id} />
        </div>
        {!item.author?._id && (
          <Button className="hover:bg-blue-400 hover:text-white">Follow</Button>
        )}
      </div>
      <div className="w-full  flex justify-center items-center">
        {item.image && item.image.length === 1 ? (
          <img
            src={`${baseUrl}/img/posts/${item.image[0]}`}
            onClick={() => navigate(`/post/${item._id}`, { replace: true })}
            className=" max-w-[200px] md:max-w-[450px] md:max-h-[400px] object-cover  "
          />
        ) : (
          <ResponsiveMasonry
            columnsCountBreakPoints={
              item.image.length <= 1 ? { 500: 1 } : { 900: 2 }
            }
            className="  h-full w-full  md:max-w-[90%]"
          >
            <Masonry className="bg-transparent " gutter="2px">
              {item.image.map((img, i) => (
                <img
                  key={i}
                  src={`${baseUrl}/img/posts/${img}`}
                  onClick={() => navigate(`post/${item._id}`)}
                  className="md:max-h-[500px]  object-contain "
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}
      </div>
      <div className="mt-5">
        <PostFooter
          like={item.likesCount}
          author={item.author._id}
          postId={item._id}
          likeArray={item.likes}
        />
      </div>
    </div>
  );
};

export default PostItem;

//add when people click show more open the page in the full page
// use input Text area for post input because it have \n it
