import { ProfileCard } from "./ProfileCard";

/* eslint-disable react/prop-types */
export function MentorCard({ user, profile }) {
  if (!user || !profile)
    return <h1 className="text-white text-2xl">No Matched Mentors</h1>;
  return (
    <div className="max-w-md w-full bg-gray-900 rounded p-6 space-y-4 m-6">
      <h2 className="text-white text-2xl">Current Mentor</h2>
      <ProfileCard user={user} profile={profile} />
      <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200">
        Create WebEx Room
      </button>
    </div>
  );
}
