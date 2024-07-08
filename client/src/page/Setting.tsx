import UserSetting from "@/components/component/SettingPage/userDataNonPassword/UserSetting";
import PasswordSettingForm from "@/components/component/SettingPage/userPassword/PasswordSettingForm";
import DialogFN from "@/components/component/ui_components/DialogFN";
import LoadingPage from "@/components/component/ui_components/LoadingPage";
import { UserContext } from "@/context/userContext";
import { useDeleteApi } from "@/features/api/Auth/delete User/useDeleteApi";
import { Button } from "@/shadcnComponent/ui/button";
import { useContext, useState } from "react";

const Setting = () => {
  const [openPasswordSetting, setOpenPasswordSetting] =
    useState<boolean>(false);
  const [openDeleteAcc, setOpenDeleteAcc] = useState<boolean>(false);
  const { deleteAcc } = useDeleteApi();
  const { user } = useContext(UserContext);
  if (!user) {
    return <LoadingPage className="w-fit" />;
  }
  return (
    <div className="flex justify-center mt-24 ">
      <div className="md:max-w-2xl w-[200px] md:w-full  flex flex-col gap-8 ml-12">
        <div>
          <h1 className="font-semibold text-2xl">User Setting</h1>
          <UserSetting />
        </div>
        <div className="flex flex-col gap-8">
          <h1 className="font-semibold text-2xl">Passwords Setting</h1>
          <div className="mx-auto flex justify-center w-full">
            <Button onClick={() => setOpenPasswordSetting(true)}>
              Change Password
            </Button>
          </div>
          <h1 className="font-semibold text-2xl">Delete Account</h1>
          <div className="mx-auto flex justify-center w-full">
            <Button onClick={() => setOpenDeleteAcc(true)}>
              Delete Account
            </Button>
          </div>
        </div>
        <DialogFN
          open={openPasswordSetting}
          setIsOpen={setOpenPasswordSetting}
          type="component"
          component={<PasswordSettingForm />}
        />
        <DialogFN
          open={openDeleteAcc}
          setIsOpen={setOpenDeleteAcc}
          type="confirm"
          deleteWhat="Account"
          func={() => deleteAcc(user.id)}
        />
      </div>
    </div>
  );
};

export default Setting;
