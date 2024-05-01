import { useState } from "react";
import Navbar from "../../components/Navbar";
import { http } from "../../utils/http";
import { useAuthGuard } from "../../utils/useAuthGuard";
import { ProfileCard } from "../../components/ProfileCard";
import toast from "react-hot-toast";

export default function Match() {
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState(null);
  const user = useAuthGuard();

  if (user?.type === "mentor") {
    window.location.href = "/app";
  }

  async function generateMatches() {
    setLoading(true);
    const res = await http("/match/", "GET");

    if (res.error) {
      console.error(res.error);
      setLoading(false);
      return;
    }

    setMatches(res.matches);
    setLoading(false);
  }

  async function matchWithMentor(mentorId) {
    const res = await http("/match/", "POST", {
      mentor_id: mentorId,
    });

    if (res.error) {
      console.error(res.error);
      return;
    }

    window.location.href = "/app";
  }

  return (
    <>
      <Navbar user={user} />
      <section className="flex justify-center flex-col items-center min-h-screen bg-gray-800 mt-16">
        <h1 className="text-white text-4xl mb-10">Match with a mentor</h1>
        <div className="max-w-md w-full bg-gray-900 rounded p-6 space-y-4">
          {!matches && (
            <button
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200"
              onClick={generateMatches}
            >
              {loading ? "Loading..." : "Match"}
            </button>
          )}
          {matches && (
            <div className="text-center">
              <h2 className="text-white text-2xl mb-10">
                Top 3 Mentor Matches
              </h2>
              {matches.map((match) => (
                <>
                  <ProfileCard
                    key={match.id}
                    user={match.user}
                    profile={match.profile}
                  />
                  <button
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200"
                    onClick={() => matchWithMentor(match.user.id)}
                  >
                    Match with {match.user.email}
                  </button>
                </>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
