import Post from "@/components/component/ui_components/PostComponent/PostArea";
import PageUI from "@/components/component/ui_components/homeUi/PageUI";

export default function Home() {
  // const { data, error, status, fetchNextPage, refetch, isLoadingAllPosts } =
  //   useGetAllPost({ fetchingFunction: fetchFollowUserPost });
  // if (isLoadingAllPosts) {
  //   <LoadingPage />;
  // }
  // console.log(data, "ths from home");
  return (
    <div>
      <PageUI pageName={"Home"} pageComponent={<Post fetchType="home" />} />
    </div>
  );
}
