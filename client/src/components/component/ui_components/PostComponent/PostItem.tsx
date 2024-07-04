import TextArea from "../homeUi/TextArea";
import PostFooter from "./PostFooter";
import { dateFormat } from "@/utils/dateFormat";

import { useNavigate } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useTheme } from "@/components/darkMode/theme-provider";

import LoadingPage from "../LoadingPage";
import DOMPurify from "dompurify";
import { PostItemType } from "@/utils/type";
import { HoverPic } from "../HoverPic";

interface item<T extends PostItemType> {
  item: T;
  to?: "popular" | "recent";
}
const PostItem = <T extends PostItemType>({ item }: item<T>) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  // const imageUrl = baseUrl + "public/img/posts/" + item.image[0]; // Construct the full image URL
  const postDay = dateFormat(item.createAt);
  if (!item) {
    return <LoadingPage />; // or handle the case when item is undefined
  }
  console.log(item, "item for post");
  console.log(item.author._id);
  const profileImage = `${
    item.author?.profileImage ?? //return leftside if it not null/undefiend .if null/undifined it will return the right
    "./../../../../../public/img/userImage/defaultUser.svg"
  }`;
  console.log(item, "check cloudinary image");
  return (
    <div
      className={` ${
        theme === "dark"
          ? "text-white  hover:bg-slate-700  border-2 border-slate-100"
          : "text-black  hover:bg-slate-200 border-2 border-slate-200"
      } p-3  rounded-2xl  shadow-md w-dvw md:max-w-2xl`}
    >
      <div className="w-full  flex  mb-3 ">
        <HoverPic profileImage={profileImage} userId={item.author._id} />

        <div
          className="flex flex-col items-start justify-start w-full "
          onClick={() => navigate(`/post/${item._id}`)}
        >
          <h1 className="text-lg font-semibold leading-3 mb-2 flex flex-col">
            {item?.author?.name}
            <span className="font-light text-sm ">{postDay}</span>
          </h1>
          <h1
            className="text-lg font-medium"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(item.title),
            }}
          ></h1>
          <TextArea text={item.detail} postID={item._id} />
        </div>
        {/* {item.author?._id !== user?.id && (
          <Button className="hover:bg-blue-400 hover:text-white">Follow</Button>
        )} */}
      </div>
      <div className="w-full  flex justify-center items-center">
        {item.image && item.image.length === 1 ? (
          <img
            src={`${item.image}`}
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
                  src={img}
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
          like={item.likes.length}
          author={item.author._id}
          postId={item._id}
        />
      </div>
    </div>
  );
};

export default PostItem;

//add when people click show more open the page in the full page
// use input Text area for post input because it have \n it
