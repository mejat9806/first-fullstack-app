import { useGetPosterProfile } from "@/features/api/User/useGetPosterProfile";
import { useParams } from "react-router-dom";
import LoadingPage from "../../LoadingPage";
import PostItem from "../../PostComponent/PostItem";

const LikePost = () => {
  const { id: userId } = useParams<{ id: string }>();
  if (!userId) {
    return <div>No user ID provided.</div>;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isGetProfile, userProfileData } = useGetPosterProfile({
    userId,
  });
  if (isGetProfile) {
    return <LoadingPage />;
  }
  return (
    <div className=" flex   md:justify-center md:items-center mt-12 w-full overflow-hidden">
      <div className="md:w-[40%] flex flex-col gap-5 w-full">
        {userProfileData?.likePosts.map((likePost) => (
          <div key={likePost.post._id}>
            <PostItem
              item={{
                id: likePost.post.id,
                createAt: likePost.post.createAt,
                _id: likePost.post.id,
                title: likePost.post.title,
                detail: likePost.post.detail,
                slug: likePost.post.slug,
                image: likePost.post.image,
                likesCount: likePost.post.likesCount,
                likes: userProfileData.likePosts,
                author: {
                  name: likePost.post.author.name,
                  _id: likePost.post.author._id,
                  profileImage: likePost.post.author.profileImage,
                },
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default LikePost;
