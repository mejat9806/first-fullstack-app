import { useContext } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const DashboardUi = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const loggedInUser = user; // Use loggedInUser to simplify conditional rendering
  console.log(user);
  const logout = async () => {
    try {
      const { data } = await axios.get("users/logout");
      if (data.error) {
        console.log(data.error);
      } else {
        navigate(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>{loggedInUser ? "You are logged in" : "Not logged in"}</h1>
      {loggedInUser && (
        <div>
          <p>Welcome, {loggedInUser.user.name}</p>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default DashboardUi;
