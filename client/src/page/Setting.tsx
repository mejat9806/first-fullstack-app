import UserSetting from "@/components/component/SettingPage/userDataNonPassword/UserSetting";
import PasswordSettingForm from "@/components/component/SettingPage/userPassword/PasswordSettingForm";
import DialogFN from "@/components/component/ui_components/DialogFN";
import { Button } from "@/shadcnComponent/ui/button";
import { useState } from "react";

const Setting = () => {
  const [openPasswordSetting, setOpenPasswordSetting] =
    useState<boolean>(false);
  return (
    <div className="flex flex-col gap-8">
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
      </div>
      <DialogFN
        open={openPasswordSetting}
        setIsOpen={setOpenPasswordSetting}
        type="component"
        component={<PasswordSettingForm />}
      />
    </div>
  );
};

export default Setting;
