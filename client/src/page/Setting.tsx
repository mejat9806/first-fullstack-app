import SettingPage from "@/component/SettingPage/SettingPage";

const Setting = () => {
  return (
    <div>
      <div>
        <h1 className="font-semibold text-2xl">User Setting</h1>
        <SettingPage />
      </div>
      <div>
        <h1 className="font-semibold text-2xl">Passwords Setting</h1>
      </div>
    </div>
  );
};

export default Setting;
