import PostItem from "./PostItem";

const Post = () => {
  return (
    <div className="w-full h-full ">
      <h1 className="text-6xl font-bold font-Poppins">Post</h1>
      <div className="flex gap-y-5 flex-col">
        <PostItem image="/registerPhoto.jpg" />
        <PostItem />
      </div>
    </div>
  );
};

export default Post;
