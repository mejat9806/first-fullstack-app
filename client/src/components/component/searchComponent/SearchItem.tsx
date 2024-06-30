import { Iposts, UserType } from "@/utils/type";
import { baseUrl } from "../ui_components/PostComponent/PostItem";

interface ISearchItemData {
  user?: UserType;
  post?: Iposts;
  type: "user" | "post" | "comment";
}

const SearchItem = ({ user, type }: ISearchItemData) => {
  if (!user) {
    return;
  }
  console.log(user.bookmark);
  if (type === "user") {
    return (
      <div
        className={`w-full flex items-center gap-4 cursor-pointer p-4 rounded-lg hover:bg-slate-300/50`}
      >
        <img
          src={`${baseUrl}img/posts/${user?.profileImage}`}
          alt={user.name}
          className="h-16 w-16  rounded-full"
        />
        <h1>{user.name}</h1>
      </div>
    );
  }
  return (
    <div className="w-full flex items-center gap-4">
      {/* <img
        src={`${baseUrl}img/posts/${user?.profileImage}`}
        alt={user.name}
        className="h-16 w-16  rounded-full"
      />
      <h1>{user.name}</h1> */}
    </div>
  );
};

export default SearchItem;
