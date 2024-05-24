import { useNavigate } from "react-router-dom";

const TextArea = ({ text, postID }: { text: string; postID: string }) => {
  const navigate = useNavigate();
  const textLength = text.length;
  return (
    <div>
      <p className="whitespace-break-spaces  text-sm 	">
        {`${text.substring(0, 100)}`}
        <button
          // onClick={() => setShowMore(!showMore)}
          onClick={() => navigate(`post/${postID}`)}
          className="font-semibold"
        >
          {textLength > 100 && <p className="ml-3 "> show more...</p>}
        </button>
      </p>
    </div>
  );
};

export default TextArea;
