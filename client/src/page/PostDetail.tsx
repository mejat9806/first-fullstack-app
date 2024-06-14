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
import DOMPurify from "dompurify";
import Comments from "@/components/component/ui_components/Comment/Comments";
import CommentsList from "@/components/component/ui_components/Comment/CommentsList";

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
  const { author, createAt, detail, image, title, likes, id, comments } =
    singleDetail.data;
  if (!user) {
    return <LoadingPage />;
  }
  const dropDownStuff = [{ name: "delete" }, { name: "update" }];
  const postDetail = dateFormat(createAt);
  const isAuthorCorrect = user.id === author?.id;
  return (
    <div className={``}>
      <div className="w-full mt-24 ml-8  justify-center items-center flex   ">
        <div
          className={`${
            theme === "dark"
              ? "text-white bg-slate-900 border-2 border-slate-100"
              : "text-black bg-slate-50"
          }  p-2 rounded-md lg:max-w-[600px] w-[80%] flex flex-col gap-2 h-full justify-between `}
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="flex md:items-center gap-3 flex-row md:flex-row">
                <div className="flex justify-start">
                  <Button
                    onClick={() => navigate("/")}
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
            <div className="flex flex-col md:mt-2">
              <h1
                className="md:text-xl text-lg font-bold whitespace-break-spaces break-words"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(title),
                }}
              ></h1>
              <p
                className="whitespace-break-spaces break-words text-sm w-full font-extralight"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(detail),
                }}
              ></p>
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
          </div>
          <PostFooter
            like={likes?.length}
            author={author?.id}
            postId={id}
            likeArray={likes}
          />
          <Comments postId={id} />
          {comments && <CommentsList comments={comments} />}
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
