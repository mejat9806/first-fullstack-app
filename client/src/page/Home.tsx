import LoadingPage from "@/components/component/ui_components/LoadingPage";
import Post from "@/components/component/ui_components/PostComponent/PostArea";
import PageUI from "@/components/component/ui_components/homeUi/PageUI";
import { fetchFollowUserPost } from "@/features/api/Posts/fetchPost/fetchFollowUserPost";
import { useGetAllPost } from "@/features/api/Posts/fetchPost/useGetAllPost";

export default function Home() {
  const { data, error, status, fetchNextPage, refetch, isLoadingAllPosts } =
    useGetAllPost({ fetchingFunction: fetchFollowUserPost });
  if (isLoadingAllPosts) {
    <LoadingPage />;
  }
  console.log(data, "ths from home");
  return (
    <div>
      <PageUI pageName={"Home"} pageComponent={<h1>hello</h1>} />
    </div>
  );
}
