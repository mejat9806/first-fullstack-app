import Post from "@/components/component/ui_components/PostComponent/PostArea";
import PageUI from "@/components/component/ui_components/homeUi/PageUI";

const Explore = () => {
  return (
    <div>
      <PageUI pageName="Explore" pageComponent={<Post fetchType="recent" />} />
    </div>
  );
};

export default Explore;
