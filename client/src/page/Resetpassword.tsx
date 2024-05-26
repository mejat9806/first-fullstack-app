import { PasswordForgotResetUI } from "@/components/component/Password/PasswordForgotResetUI";
import ResetPassForm from "@/components/component/Password/Reset/ResetPassForm";

const Resetpassword = () => {
  return (
    <div>
      {/* <ResetPassPageUI /> */}
      <PasswordForgotResetUI
        desc="Input your new password "
        mainTitles="Reset Password "
        form={<ResetPassForm />}
        image="/img/resetPassImage2.webp"
        alt="Reset Password"
      />
    </div>
  );
};

export default Resetpassword;
