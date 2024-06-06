import { useLikeDislike } from "@/features/api/Posts/likeDislike/useLikeDislike";
import { useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import LoadingPage from "../LoadingPage";
import { PostItemType } from "./PostItem";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";

export interface Ilike {
  user: string;
  post: PostItemType;
}
interface PostFooter {
  like: number;
  author: string;
  postId: string;
  likeArray: Ilike[];
}

const PostFooter = ({ like, postId, author, likeArray }: PostFooter) => {
  const { user } = useContext(UserContext);
  const { likeDislike } = useLikeDislike();
  const queryClient = useQueryClient();
  if (!user) {
    return <LoadingPage />;
  }
  const userID = user.id || user.user.id;
  // const [userVote, setUserVote] = useState<null | "like" | "dislike">(null);
  const userLike = likeArray.map((user) => user.user);

  if (!(like || postId || author || likeArray)) {
    return <LoadingPage />;
  }
  console.log(user);
  const isLike = userLike.includes(userID);
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
