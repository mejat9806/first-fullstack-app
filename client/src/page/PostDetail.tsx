import LoadingPage from "@/component/ui_components/LoadingPage";
import { IsinglePostDetail } from "@/features/api/Posts/PostDetail/fetchPostDetail";
import { useFetchDetails } from "@/features/api/Posts/PostDetail/useFetchDetail";

const PostDetail = () => {
  const { singleDetailLoading, singleDetail, singleDetailError } =
    useFetchDetails();

  if (singleDetailLoading || !singleDetail) {
    return <LoadingPage />;
  }
  const { data }: IsinglePostDetail = singleDetail;
  const { name, post } = data;
  console.log(name, post);
  return (
    <div className="h-svh w-full">
      <h1>{name}</h1>
      <div>{post}</div>
    </div>
  );
};

export default PostDetail;
