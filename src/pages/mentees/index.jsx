import { useEffect, useState } from "react";
import { useAuthGuard } from "../../utils/useAuthGuard";
import { ProfileCard } from "../../components/ProfileCard";
import { http } from "../../utils/http";
import Navbar from "../../components/Navbar";

export default function Mentees() {
  const user = useAuthGuard();

  const [loading, setLoading] = useState(true);
  const [mentees, setMentees] = useState(null);

  useEffect(() => {
    async function getMentors() {
      const res = await http("/mentee/list", "GET");

      setMentees(res);
      setLoading(false);
    }

    getMentors();
  }, []);

  return (
    <>
      <Navbar user={user} />
      <section className="flex justify-center items-center min-h-screen bg-gray-800 mt-16">
        <div className="max-w-md w-full bg-gray-900 rounded p-6 space-y-4 m-6">
          {loading | !mentees ? (
            <h1 className="text-white text-4xl">Loading...</h1>
          ) : (
            <>
              <h2 className="text-white text-2xl text-center">
                All Registered Mentees
              </h2>
              {mentees.map((mentee) => {
                return (
                  <ProfileCard
                    key={mentee.user.id}
                    user={mentee.user}
                    profile={mentee.profile}
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
