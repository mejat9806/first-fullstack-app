import { ReactElement } from "react";

const PageUI = ({
  pageName,
  pageComponent,
}: {
  pageName: string;
  pageComponent: ReactElement;
}) => {
  return (
    <div className=" flex justify-center items-center w-full  md:ml-0 my-24">
      <div className="w-[350px] sm:max-w-xl h-full ">
        <h1 className="text-4xl font-semibold">{pageName} </h1>
        {pageComponent}
      </div>
    </div>
  );
};

export default PageUI;
