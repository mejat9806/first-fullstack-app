import Post from "@/components/component/ui_components/PostComponent/PostArea";
import PageUI from "@/components/component/ui_components/homeUi/PageUI";

const PopularPost = () => {
  return (
    <PageUI pageName="Popular" pageComponent={<Post fetchType="popular" />} />
  );
};

export default PopularPost;
