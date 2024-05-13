import { useState } from "react";

const TextArea = ({ text }: { text: string }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div>
      <p>
        {showMore ? text : `${text.substring(0, 50)}`}{" "}
        <button
          onClick={() => setShowMore(!showMore)}
          className="font-semibold"
        >
          {showMore ? "show less" : "show more..."}
        </button>
      </p>
    </div>
  );
};

export default TextArea;
