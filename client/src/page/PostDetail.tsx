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
import { useLikeDislike } from "@/features/api/Posts/likeDislike/useLikeDislike";

const PostDetail = () => {
  const { singleDetailLoading, singleDetail } = useFetchDetails();
  const [openImage, setOpenImage] = useState(false);
  const { isDeletePostLoading } = useDeletePost();
  const { isLikeDislike } = useLikeDislike();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { theme } = useTheme();

  // Check if data is still loading or any necessary data is missing
  if (
    singleDetailLoading ||
    !singleDetail ||
    !singleDetail.data ||
    isDeletePostLoading ||
    isLikeDislike
  ) {
    return <LoadingPage />;
  }

  const { author, createAt, detail, image, title, likes, id } =
    singleDetail.data;
  const dropDownStuff = [{ name: "delete" }, { name: "update" }];
  const postDetail = dateFormat(createAt);
  const isAuthorCorrect = user?.id === author?.id;

  return (
    <div className="h-full flex md:grid md:grid-cols-postDetails items-start flex-col w-full">
      <div className="w-full flex-col h-full flex md:justify-center md:items-center">
        <div
          className={`${
            theme === "dark"
              ? "text-white bg-slate-900 border-2 border-slate-100"
              : "text-black bg-slate-50"
          } mt-2 p-2 rounded-lg md:max-w-[500px] w-full flex flex-col gap-2`}
        >
          <div className="flex items-center justify-between">
            <div className="flex md:items-center gap-3 flex-row md:flex-row">
              <div className="flex justify-start">
                <Button
                  onClick={() => navigate(-1)}
                  className="hover:bg-slate-400 bg-slate-200 rounded-full h-10 w-10 p-0"
                >
                  <ArrowBigLeft className="scale-110" />
                </Button>
              </div>
              <div className="flex flex-col">
                <div className="flex">
                  <div
                    className="flex gap-4"
                    onClick={() => {
                      navigate(`/profile/${author.id}`);
                    }}
                  >
                    <img
                      src={`${baseUrl}/img/posts/${author?.profileImage}`}
                      alt="profileImage"
                      className="h-[50px] w-[50px] rounded-full"
                    />
                    <div>
                      <h1 className="text-xs">{author?.name}</h1>
                      <h1 className="text-xs">{postDetail}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {isAuthorCorrect && (
              <ThreeDotDropDown dropDownStuff={dropDownStuff} />
            )}
          </div>
          <div className="flex flex-col md:mt-6">
            <h1 className="text-xl">{title}</h1>
            <p className="whitespace-break-spaces break-words text-md w-full">
              {detail}
            </p>
          </div>
          <div className="w-full flex justify-center">
            {image && image.length === 1 ? (
              <img
                src={`${baseUrl}/img/posts/${image[0]}`}
                onClick={() => setOpenImage(true)}
                className="max-w-[200px] md:max-w-[480px] md:max-h-[450px] object-cover"
              />
            ) : (
              <ResponsiveMasonry
                columnsCountBreakPoints={
                  image && image.length <= 1 ? { 500: 1 } : { 900: 2 }
                }
                className="h-full w-full md:max-w-[90%]"
              >
                <Masonry className="bg-transparent" gutter="2px">
                  {image &&
                    image.map((img, i) => (
                      <img
                        key={i}
                        src={`${baseUrl}/img/posts/${img}`}
                        onClick={() => setOpenImage(true)}
                        className="md:max-h-[500px] object-contain"
                      />
                    ))}
                </Masonry>
              </ResponsiveMasonry>
            )}
          </div>
          <div className="mt-5 mb-4">
            <PostFooter
              like={likes?.length}
              author={author?.id}
              postId={id}
              likeArray={likes}
            />
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
