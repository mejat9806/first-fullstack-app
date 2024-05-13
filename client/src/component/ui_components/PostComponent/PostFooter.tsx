import React from "react";
import { IoChatbubbleEllipses, IoThumbsUp } from "react-icons/io5";

const PostFooter = () => {
  return (
    <div className="w-full flex justify-end">
      <div className="flex gap-5 items-center justify-center">
        <div className="flex items-center justify-center">
          <IoThumbsUp size={30} />
          <p>1</p>
        </div>
        <IoChatbubbleEllipses size={30} />
      </div>
    </div>
  );
};

export default PostFooter;
