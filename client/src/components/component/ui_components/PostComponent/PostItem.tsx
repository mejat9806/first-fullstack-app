import TextArea from "../homeUi/TextArea";
import PostFooter from "./PostFooter";
import { dateFormat } from "@/utils/dateFormat";

import { useNavigate } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useTheme } from "@/components/darkMode/theme-provider";

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
  const { theme } = useTheme();
  // const imageUrl = baseUrl + "public/img/posts/" + item.image[0]; // Construct the full image URL
  const postDay = dateFormat(item.createAt);
  if (!item) {
    return null; // or handle the case when item is undefined
  }

  return (
    <div
      className={` ${
        theme === "dark"
          ? "text-white  hover:bg-slate-700  border-2 border-slate-100"
          : "text-black  hover:bg-slate-200"
      } p-5  rounded-2xl  l shadow-2xl`}
    >
      <div className="w-full  flex gap-1 mb-3">
        <img
          src={`${baseUrl}img/posts/${item.author.profileImage}`}
          className="h-10 w-10 rounded-full"
          // change this
        />
        <div
          className="flex flex-col items-start justify-start w-full "
          onClick={() => navigate(`post/${item._id}`)}
        >
          <h1 className="text-lg font-semibold leading-3 mb-2 flex flex-col">
            {item?.author?.name}
            <span className="font-light text-sm ">{postDay}</span>
          </h1>
          <h1 className="text-lg font-medium">{item.title}</h1>
          <TextArea text={item.detail} postID={item._id} />
        </div>
      </div>
      <div className="w-full  flex justify-center items-center">
        <ResponsiveMasonry
          columnsCountBreakPoints={
            item.image.length < 2 ? { 500: 1 } : { 900: 2 }
          }
          style={{ width: "100%", height: "100%" }}
          className="mx-5 h-52"
        >
          <Masonry gutter="1px">
            {item.image.map((img, i) => (
              <img
                key={i}
                onClick={() => navigate(`post/${item._id}`)}
                src={`${baseUrl}/img/posts/${img}`}
                style={{ width: "100%", height: "100%" }}
                className="rounded-xl"
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
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
