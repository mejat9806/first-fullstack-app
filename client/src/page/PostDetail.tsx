import { UserContext } from "@/context/userContext";

import { useFetchDetails } from "@/features/api/Posts/PostDetail/useFetchDetail";
import { useDeletePost } from "@/features/api/Posts/deletePost/useDeletePost";
import { dateFormat } from "@/utils/dateFormat";
import { useContext, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Button } from "@/shadcnComponent/ui/button";
import { ArrowBigLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "@/components/component/ui_components/LoadingPage";
import ThreeDotDropDown from "@/components/component/ui_components/ThreeDotDropDown";
import { baseUrl } from "@/components/component/ui_components/PostComponent/PostItem";
import PostFooter from "@/components/component/ui_components/PostComponent/PostFooter";
import DialogFN from "@/components/component/ui_components/DialogFN";
import { useTheme } from "@/components/darkMode/theme-provider";

const PostDetail = () => {
  const { singleDetailLoading, singleDetail, isFetching } = useFetchDetails();
  const [openImage, setOpenImage] = useState(false);
  const { isDeletePostLoading } = useDeletePost();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { theme } = useTheme();
  if (
    singleDetailLoading ||
    !singleDetail ||
    isFetching ||
    isDeletePostLoading
  ) {
    return <LoadingPage />;
  }

  console.log(isFetching);
  const dropDownStuff = [{ name: "delete" }, { name: "update" }];
  const { author, createAt, detail, image, title } = singleDetail.data;
  const postDetail = dateFormat(createAt);

  const isAurthorCorrect = user?.id === author?.id;
  return (
    <div className="h-full flex md:grid md:grid-cols-postDetails items-start flex-col w-full ">
      <div className="w-full flex-col h-full flex md:justify-center md:items-center ">
        <div
          className={`${
            theme === "dark"
              ? "text-white bg-slate-900  border-2 border-slate-100"
              : "text-black bg-slate-50 "
          } mt-2 p-2 rounded-lg  md:w-[600px] md:h-[600px] h-full w-full flex flex-col gap-2`}
        >
          <div className="flex gap-3 items-center  ">
            <div className="  ">
              <Button
                onClick={() => navigate(-1)}
                className="hover:bg-slate-400 bg-slate-200  rounded-full h-10 w-10 p-0"
              >
                <ArrowBigLeft className="scale-110" />
              </Button>
            </div>
            <div className="flex flex-col ">
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <img
                    src="/img/userImage/defaultUser.svg"
                    alt="profileImage"
                    className="h-[50px] w-[50px]"
                  />
                  <div>
                    <h1>{author?.name}</h1>
                    <h1>{postDetail}</h1>
                  </div>
                </div>
                {isAurthorCorrect && (
                  <ThreeDotDropDown dropDownStuff={dropDownStuff} />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col  mt-6">
            <h1 className="text-xl">{title}</h1>
            <p className=" whitespace-break-spaces break-words text-md w-full">
              {detail}
            </p>
          </div>
          <div className="w-full flex justify-center ">
            {/* <div className="w-full md:w-[500px] ">
              {image[0] && (
                <CarouselComp imageProp={image} setOpenImage={setOpenImage} />
              )}
            </div> */}
            <ResponsiveMasonry
              columnsCountBreakPoints={
                image.length <= 1 ? { 500: 1 } : { 900: 2 }
              }
              className="w-[100%]  md:w-[100%]"
            >
              <Masonry className="bg-black " gutter="2px">
                {image.map((img, i) => (
                  <img
                    key={i}
                    src={`${baseUrl}/img/posts/${img}`}
                    onClick={() => setOpenImage(true)}
                    className={`$${
                      image.length > 1 ? "md:h-[200px] md:w-full h-[200px]" : ""
                    }`}
                  />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </div>

          <div className="mt-5 mb-4 ">
            <PostFooter />
          </div>
        </div>
      </div>
      <DialogFN
        open={openImage}
        setIsOpen={setOpenImage}
        type="image"
        image={image}
      />
      <div className="h-[50%] hidden md:flex bg-red-500"></div>
    </div>
  );
};

export default PostDetail;
