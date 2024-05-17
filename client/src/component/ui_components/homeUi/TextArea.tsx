import { useNavigate } from "react-router-dom";

const TextArea = ({ text, postID }: { text: string; postID: string }) => {
  const navigate = useNavigate();

  return (
    <div>
      <p>
        {`${text.substring(0, 100)}`}
        <button
          // onClick={() => setShowMore(!showMore)}
          onClick={() => navigate(`post/${postID}`)}
          className="font-semibold"
        >
          <p className="ml-3"> show more...</p>
        </button>
      </p>
    </div>
  );
};

export default TextArea;
