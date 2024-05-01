import { useEffect, useState } from "react";
import { useAuthGuard } from "../../utils/useAuthGuard";
import { ProfileCard } from "../../components/ProfileCard";
import { http } from "../../utils/http";
import Navbar from "../../components/Navbar";

export default function Mentors() {
  const user = useAuthGuard();

  const [loading, setLoading] = useState(true);
  const [mentors, setMentors] = useState(null);

  useEffect(() => {
    async function getMentors() {
      const res = await http("/mentor/list", "GET");

      setMentors(res);
      setLoading(false);
    }

    getMentors();
  }, []);

  return (
    <>
      <Navbar user={user} />
      <section className="flex justify-center items-center min-h-screen bg-gray-800 mt-16">
        <div className="max-w-md w-full bg-gray-900 rounded p-6 space-y-4 m-6">
          {loading | !mentors ? (
            <h1 className="text-white text-4xl">Loading...</h1>
          ) : (
            <>
              <h2 className="text-white text-2xl text-center">
                All Registered Mentors
              </h2>
              {mentors.map((mentor) => {
                return (
                  <ProfileCard
                    key={mentor.user.id}
                    user={mentor.user}
                    profile={mentor.profile}
                  />
                );
              })}
            </>
          )}
        </div>
      </section>
    </>
  );
}
