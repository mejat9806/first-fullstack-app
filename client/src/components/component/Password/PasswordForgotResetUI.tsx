import { IData } from "@/utils/type";

export const PasswordForgotResetUI = ({
  mainTitles,
  desc,
  form,
  image,
  alt,
}: IData) => {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="md:grid md:grid-cols-2 shadow-2xl rounded-lg bg-slate-50  mx-3 w-full max-w-3xl">
        <div className="hidden md:flex ">
          <img
            src={image}
            alt={alt}
            className="h-full object-cover w-full rounded-2xl"
          />
        </div>
        <div className="m-7  flex items-center justify-center flex-col gap-4">
          <h1 className="text-2xl text-center font-extrabold">{mainTitles}</h1>
          <p className="text-center text-sm">{desc} </p>
          <div>{form}</div>
        </div>
      </div>
    </div>
  );
};
