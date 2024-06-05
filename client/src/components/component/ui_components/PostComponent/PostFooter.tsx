import { useLikeDislike } from "@/features/api/Posts/likeDislike/useLikeDislike";
import { useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import LoadingPage from "../LoadingPage";

export interface Ilike {
  user: string;
}
interface PostFooter {
  like: number;
  author: string;
  postId: string;
  likeArray: Ilike[];
}

const PostFooter = ({ like, postId, author, likeArray }: PostFooter) => {
  console.log(like, postId, author, likeArray);
  // const [userVote, setUserVote] = useState<null | "like" | "dislike">(null);
  const { likeDislike } = useLikeDislike();
  const userLike = likeArray?.map((user) => user.user);
  const queryClient = useQueryClient();
  if (!(like || postId || author || likeArray)) {
    return <LoadingPage />;
  }
  console.log(likeArray, "likeArray");
  const isLike = userLike.includes(author);
  const handleLike = () => {
    likeDislike(postId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        queryClient.invalidateQueries({ queryKey: ["userProfile", author] });
      },
    });
  };

  return (
    <div className="w-full flex justify-start">
      <div className="flex gap-5 items-center justify-center">
        <div className="flex items-center justify-center gap-2 h-10 ">
          <button onClick={handleLike}>
            <Heart
              size={30}
              className={`${
                isLike
                  ? "fill-pink-300 stroke-none hover:fill-pink-200"
                  : "fill-white hover:fill-pink-200"
              } hover:scale-105 transition-all duration-200`}
            />
          </button>
          <p className="w-4 ">{like}</p>
        </div>
        <IoChatbubbleEllipses size={30} />
      </div>
    </div>
  );
};

export default PostFooter;
