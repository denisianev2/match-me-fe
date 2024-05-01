import { ProfileCard } from "./ProfileCard";
import { http } from "../utils/http";
import Button from "./Button";
import toast from "react-hot-toast";
import { useState } from "react";

/* eslint-disable react/prop-types */
export function MentorCard({ mentor, removeMentor }) {
  const [roomID, setRoomID] = useState(mentor?.room_id);
  const [loading, setLoading] = useState(false);

  if (!mentor?.user || !mentor?.profile)
    return <h1 className="text-white text-2xl">No Matched Mentors</h1>;

  async function createWebExRoom() {
    setLoading(true);
    const res = await http("/match/room", "POST", {
      mentor_id: mentor.user.id,
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
      mentor_id: mentor.user.id,
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

  async function unlinkMentor() {
    const res = http("/mentee/unlink", "POST", {
      mentor_id: mentor.user.id,
    });

    if (res.error) {
      toast.success("Failed to unlink mentor");
      return;
    }

    removeMentor();
    toast.success("Mentor unlinked successfully");
  }
  return (
    <div className="max-w-md w-full bg-gray-900 rounded p-6 space-y-4 m-6">
      <ProfileCard user={mentor.user} profile={mentor.profile} />
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
        onClick={unlinkMentor}
      >
        Delete Mentor
      </Button>
    </div>
  );
}
