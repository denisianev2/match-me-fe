import { useRef } from "react";
import Button from "../../components/Button";
import SkeletonText from "../../components/SkeletonText";

export function SettingsTab({ user }) {
  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();

  async function changePassword() {
    // Not implemented
  }

  return user ? (
    <div className="w-full bg-gray-900 rounded p-6 space-y-4 h-full">
      <h1 className="text-4xl text-white">Settings</h1>
      <input
        className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
        type="text"
        placeholder="Current Password"
        ref={currentPasswordRef}
      />
      <input
        className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
        type="password"
        placeholder="New Password"
        ref={newPasswordRef}
      />
      <Button onClick={changePassword} className={"px-2"}>
        Change Password
      </Button>
    </div>
  ) : (
    <SkeletonText />
  );
}
