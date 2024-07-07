import { Iposts, UserType } from "@/utils/type";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

interface ISearchItemData {
  user?: UserType;
  post?: Iposts;
  type?: "user" | "post" | "comment";
}

const SearchItem = ({ user, type = "post", post }: ISearchItemData) => {
  const navigate = useNavigate();
  console.log(post);

  const textDetailSanitize = post?.detail;
  if (type === "user") {
    return (
      <div
        className={`w-full flex items-center gap-4 cursor-pointer p-4 rounded-lg hover:bg-slate-300/50`}
        onClick={() => navigate(`/profile/${user?.id}`, { replace: true })}
      >
        <img
          src={`${user?.profileImage}`}
          alt={user?.name}
          className="h-16 w-16  rounded-full"
        />
        <h1>{user?.name}</h1>
      </div>
    );
  }
  return (
    <div
      className={`w-full flex justify-between  gap-4 cursor-pointer p-4 rounded-lg hover:bg-slate-300/50`}
    >
      <div>
        <h1 className="text-lg  font-semibold">{post?.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(textDetailSanitize as string),
          }}
        ></p>
      </div>
      <img src={post?.image[0]} className="w-16 h-16" />
    </div>
  );
};

export default SearchItem;
