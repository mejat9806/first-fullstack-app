/* eslint-disable react-hooks/rules-of-hooks */
import { useLikeDislike } from "@/features/api/Posts/likeDislike/useLikeDislike";
import { useQueryClient } from "@tanstack/react-query";
import { Bookmark, Heart } from "lucide-react";
import LoadingPage from "../LoadingPage";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { useGetPosterProfile } from "@/features/api/User/useGetPosterProfile";
import { FaCommentDots } from "react-icons/fa6";
import type { PostFooter } from "@/utils/type";
import useBookmark from "@/features/api/bookmark/useBookmark";

const PostFooter = ({ like, postId, author }: PostFooter) => {
  const { user } = useContext(UserContext);
  const { likeDislike } = useLikeDislike();
  const { mutateBookmark } = useBookmark();
  const queryClient = useQueryClient();
  if (!user) {
    return <LoadingPage />;
  }
  const userId = user.id;
  const { userProfileData } = useGetPosterProfile({
    userId,
  });
  if (!userProfileData) {
    return <LoadingPage />;
  }
  // const [userVote, setUserVote] = useState<null | "like" | "dislike">(null);
  const userProfileLike = userProfileData?.likePosts.map(
    (user) => user.post?._id,
  );
  const userProfileBookmark = userProfileData.bookmark.map(
    (post) => post.post.id,
  );
  const isProfileLike = userProfileLike?.includes(postId);
  const isBookMark = userProfileBookmark?.includes(postId);
  // const isLike = userLike.includes(postId);
  const handleLike = () => {
    likeDislike(postId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        queryClient.invalidateQueries({ queryKey: ["userProfile", user.id] });
        queryClient.invalidateQueries({ queryKey: ["userProfile", author] });
      },
    });
  };
  const handleToggleBookmark = () => {
    mutateBookmark(postId);
  };
  return (
    <div className="w-full flex justify-start">
      <div className="flex gap-5 items-center justify-center">
        <div className="flex items-center justify-center gap-2 h-10 ">
          <button onClick={handleLike}>
            <Heart
              size={30}
              className={`${
                isProfileLike
                  ? "fill-pink-300 stroke-none hover:fill-pink-200"
                  : "fill-white hover:fill-pink-200"
              } hover:scale-105 transition-all duration-200`}
            />
          </button>
          <p className="w-4 ">{like}</p>
        </div>
        <FaCommentDots size={30} />
        <Bookmark
          size={30}
          onClick={handleToggleBookmark}
          className={`${
            isBookMark
              ? "fill-cyan-300 stroke-none hover:fill-cyan-200"
              : "fill-white hover:fill-cyan-200"
          } hover:scale-105 transition-all duration-200`}
        />
      </div>
    </div>
  );
};

export default PostFooter;
