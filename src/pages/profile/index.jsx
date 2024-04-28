import { useMemo, useState } from "react";
import { useAuthGuard } from "../../utils/useAuthGuard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../../components/IconButton";
import Navbar from "../../components/Navbar";
import ProfileTab from "./ProfileTab";
import { SettingsTab } from "./SettingsTab";

export default function Profile() {
  const [currentTab, setCurrentTab] = useState("profile");
  const user = useAuthGuard();
  const currentTabComponent = useMemo(() => {
    if (currentTab == "profile") {
      return <ProfileTab user={user} />;
    }
    if (currentTab == "Settings") {
      return <SettingsTab user={user} />;
    }
  }, [user, currentTab]);

  return (
    <>
      <Navbar />
      <section className="flex justify-center items-center h-screen bg-gray-800">
        <div className="grid grid-cols-4 gap-4 w-[64rem] mx-4 h-[18rem]">
          <div className="col-span-1 flex flex-col justify-between bg-gray-900 rounded p-4">
            <IconButton
              icon={<FontAwesomeIcon icon={faUser} />}
              onClick={() => setCurrentTab("profile")}
            />
            <IconButton
              icon={<FontAwesomeIcon icon={faGear} />}
              onClick={() => setCurrentTab("Settings")}
            />
          </div>
          <div className="col-span-3">{currentTabComponent}</div>
        </div>
      </section>
    </>
  );
}
