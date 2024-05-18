import LoadingPage from "@/component/ui_components/LoadingPage";
import PostFooter from "@/component/ui_components/PostComponent/PostFooter";
import { baseUrl } from "@/component/ui_components/PostComponent/PostItem";
import ThreeDotDropDown from "@/component/ui_components/ThreeDotDropDown";

import { useFetchDetails } from "@/features/api/Posts/PostDetail/useFetchDetail";
import { dateFormat } from "@/utils/dateFormat";

const PostDetail = () => {
  const { singleDetailLoading, singleDetail } = useFetchDetails();

  if (singleDetailLoading || !singleDetail) {
    return <LoadingPage />;
  }

  const { author, createAt, detail, image, title } = singleDetail.data;
  const postDetail = dateFormat(createAt);
  function test() {
    window.alert("hello");
  }
  const dropDownStuff = [
    { name: "delete", function: test },
    { name: "update" },
  ];

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
            <ThreeDotDropDown dropDownStuff={dropDownStuff} type={"threeDot"} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl">{title}</h1>
            <p className=" whitespace-break-spaces break-words text-sm w-full">
              {detail}
            </p>
          </div>
        </div>
        {image[0] && (
          <div className="mt-4 mx-2 h-[40rem] w-full flex justify-center items-center">
            <img
              src={`${baseUrl}/img/posts/${image[0]}`}
              alt=""
              className="h-full rounded-xl"
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
