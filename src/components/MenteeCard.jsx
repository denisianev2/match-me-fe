import { ProfileCard } from "./ProfileCard";
import { http } from "../utils/http";
import Button from "./Button";
import toast from "react-hot-toast";
import { useState } from "react";

/* eslint-disable react/prop-types */
export function MenteeCard({ mentee, removeMentee }) {
  const [roomID, setRoomID] = useState(mentee?.room_id);
  const [loading, setLoading] = useState(false);

  if (!mentee?.user || !mentee?.profile)
    return <h1 className="text-white text-2xl">No Matched Mentors</h1>;

  async function createWebExRoom() {
    setLoading(true);
    const res = await http("/match/room", "POST", {
      mentee_id: mentee.user.id,
    });

    if (res.room_id) {
      toast.success("WebEx Room Created");
      setRoomID(res.room_id);
      setLoading(false);
      return;
    }

    toast.error("Failed to create WebEx Room");
    setLoading(false);
  }

  async function deleteWebExRoom() {
    setLoading(true);
    const res = await http("/match/room", "DELETE", {
      mentee_id: mentee.user.id,
    });

    if (res.message) {
      toast.success("WebEx Room Deleted");
      setRoomID(null);
      setLoading(false);
      return;
    }

    toast.error("Failed to delete WebEx Room");
    setLoading(false);
  }

  function unlinkMentee() {
    const res = http("/mentor/unlink", "POST", {
      mentee_id: mentee.user.id,
    });

    if (res.error) {
      toast.success("Failed to unlink mentee");
      return;
    }

    removeMentee();

    toast.success("Mentee unlinked");
  }

  return (
    <div className="max-w-md w-full bg-gray-900 rounded p-6 space-y-4 m-6">
      <ProfileCard user={mentee.user} profile={mentee.profile} />
      {roomID ? (
        <>
          <Button onClick={deleteWebExRoom} className={"w-full"}>
            {loading ? "Deleting..." : "Delete WebEx Room"}
          </Button>
        </>
      ) : (
        <Button onClick={createWebExRoom} className={"w-full"}>
          {loading ? "Creating..." : "Create WebEx Room"}
        </Button>
      )}
      <Button
        className={"w-full bg-red-600 hover:bg-red-700"}
        onClick={unlinkMentee}
      >
        Delete Mentee
      </Button>
    </div>
  );
}
