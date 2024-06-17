import { useTheme } from "@/components/darkMode/theme-provider";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";

const TextArea = ({ text, postID }: { text: string; postID: string }) => {
  const navigate = useNavigate();
  const textLength = text.length;
  const maxLength = 50;
  const displayText =
    textLength > maxLength ? text.substring(0, maxLength) + "..." : text;
  const { theme } = useTheme();
  console.log(displayText);
  return (
    <div>
      <div
        className={`whitespace-break-spaces text-sm ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(displayText),
        }}
      />
      {textLength > maxLength && (
        <button
          onClick={() => navigate(`post/${postID}`)}
          className="font-semibold ml-3"
        >
          show more...
        </button>
      )}
    </div>
  );
};

export default TextArea;
