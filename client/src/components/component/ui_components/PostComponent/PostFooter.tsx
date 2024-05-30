import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import React, { useState } from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";

interface PostFooter {
  like: number;
}

const PostFooter = ({ like }: PostFooter) => {
  const [Like, setlike] = useState(1);
  const [userVote, setUserVote] = useState<null | "like" | "dislike">(null);

  console.log(Like);

  const handleLike = () => {
    if (userVote === "like") {
      //this will run if the if it already like
      setUserVote(null); //then it will set the vote to null
      setlike(Like - 1); // then it will decrease the count
    } else {
      if (userVote === "dislike") {
        setlike(Like + 1); // Undo dislike and add like
      } else {
        setlike(Like + 1); // Add like
      }
      setUserVote("like");
    }
  };

  const handleDownvote = () => {
    if (userVote === "dislike") {
      setUserVote(null);
      setlike(Like + 1); // Decrement dislike count
    } else {
      if (userVote === "like") {
        setlike(Like - 1); // Undo like and add dislike
      } else {
        setlike(Like - 1); // Add dislike
      }
      setUserVote("dislike");
    }
  };

  return (
    <div className="w-full flex justify-start">
      <div className="flex gap-5 items-center justify-center">
        <div className="flex items-center justify-center gap-2 h-10 ">
          <button onClick={handleLike}>
            <ArrowBigUp
              size={30}
              className={`${userVote === "like" ? "stroke-blue-300" : ""}`}
            />
          </button>
          <p className="w-4">{Like}</p>
          <button onClick={handleDownvote}>
            <ArrowBigDown
              size={30}
              className={`${userVote === "dislike" ? "stroke-red-500" : ""}`}
            />
          </button>
        </div>
        <IoChatbubbleEllipses size={30} />
      </div>
    </div>
  );
};

export default PostFooter;
