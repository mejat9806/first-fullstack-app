import LoadingPage from "@/component/ui_components/LoadingPage";
import PostFooter from "@/component/ui_components/PostComponent/PostFooter";
import { baseUrl } from "@/component/ui_components/PostComponent/PostItem";
import ThreeDotDropDown from "@/component/ui_components/ThreeDotDropDown";
import { UserContext } from "@/context/userContext";

import { useFetchDetails } from "@/features/api/Posts/PostDetail/useFetchDetail";
import { useDeletePost } from "@/features/api/Posts/deletePost/useDeletePost";
import { dateFormat } from "@/utils/dateFormat";
import { useContext } from "react";

const PostDetail = () => {
  const { singleDetailLoading, singleDetail } = useFetchDetails();
  const { isDeletePostLoading } = useDeletePost();
  const { user } = useContext(UserContext);
  if (singleDetailLoading || !singleDetail) {
    return <LoadingPage />;
  }
  const dropDownStuff = [{ name: "delete" }, { name: "update" }];
  const { author, createAt, detail, image, title } = singleDetail.data;
  const postDetail = dateFormat(createAt);

  const isAurthorCorrect = user?.id === author?.id;

  if (isDeletePostLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="w-full  flex justify-center items-center">
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
        {image[0] && (
          <div className="mt-4  w-full flex justify-center items-center">
            <img
              src={`${baseUrl}/img/posts/${image[0]}`}
              alt=""
              className="h-full rounded-xl object-contain"
            />
          </div>
        )}
        <div className="mt-5 mb-4 bg-">
          <PostFooter />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
