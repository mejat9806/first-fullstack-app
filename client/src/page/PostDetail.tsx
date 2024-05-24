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

const PostDetail = () => {
  const { singleDetailLoading, singleDetail, isFetching } = useFetchDetails();
  const [openImage, setOpenImage] = useState(false);
  const { isDeletePostLoading } = useDeletePost();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
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
    <div>
      <div className="w-full flex-col  flex justify-center items-center">
        <div className=" md:w-1/2 w-full">
          <Button
            onClick={() => navigate(-1)}
            className="hover:bg-slate-400 bg-slate-200  rounded-full h-10 w-10 p-0"
          >
            <ArrowBigLeft className="scale-110" />
          </Button>
        </div>
        <div className="bg-slate-100 mt-2 p-2 rounded-lg mb-10 md:w-1/2 h-1/2 w-full ">
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
            <div className="flex flex-col">
              <h1 className="text-xl">{title}</h1>
              <p className=" whitespace-break-spaces break-words text-sm w-full">
                {detail}
              </p>
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            {/* <div className="w-full md:w-[500px] ">
              {image[0] && (
                <CarouselComp imageProp={image} setOpenImage={setOpenImage} />
              )}
            </div> */}
            <ResponsiveMasonry
              columnsCountBreakPoints={
                image.length < 2 ? { 500: 1 } : { 900: 2 }
              }
              style={{ width: "100%", height: "100%" }}
              className="mx-5 h-52"
            >
              <Masonry gutter="10px">
                {image.map((img, i) => (
                  <img
                    key={i}
                    src={`${baseUrl}/img/posts/${img}`}
                    style={{ width: "100%", height: "100%" }}
                    onClick={() => setOpenImage(true)}
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
    </div>
  );
};

export default PostDetail;
