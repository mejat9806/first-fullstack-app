import ForgotPassForm from "@/components/component/Password/Forgot/ForgotPassForm";
import { PasswordForgotResetUI } from "@/components/component/Password/PasswordForgotResetUI";

const ForgotPass = () => {
  return (
    <div>
      <PasswordForgotResetUI
        mainTitles="Forgot Password?"
        desc="Just input your email and we will work it out😉"
        form={<ForgotPassForm />}
        image="/img/resetPassImage.webp"
        alt="Reset Password"
      />
    </div>
  );
};

export default ForgotPass;
