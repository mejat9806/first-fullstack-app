import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TextArea = ({ text }: { text: string }) => {
  const navigate = useNavigate();

  return (
    <div>
      <p>
        {`${text.substring(0, 100)}`}
        <button
          // onClick={() => setShowMore(!showMore)}
          onClick={() => navigate(`post/testid`)}
          className="font-semibold"
        >
          <p className="ml-3"> show more...</p>
        </button>
      </p>
    </div>
  );
};

export default TextArea;
