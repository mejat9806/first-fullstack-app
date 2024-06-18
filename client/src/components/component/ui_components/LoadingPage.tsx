import { useTheme } from "@/components/darkMode/theme-provider";
import { twMerge } from "tailwind-merge";

const LoadingPage = ({ className }: { className?: string }) => {
  console.log(className, "class");
  const style = twMerge(
    `flex space-x-2 justify-center items-center bg-transparent h-screen dark:invert ${className}`,
  );
  return (
    <div className="">
      <div className={style}>
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default LoadingPage;
