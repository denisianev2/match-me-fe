import { useEffect, useState } from "react";
import { MentorCard } from "../../components/MentorCard";
import Navbar from "../../components/Navbar";
import { useAuthGuard } from "../../utils/useAuthGuard";
import { http } from "../../utils/http";

export default function App() {
  const user = useAuthGuard();
  const [mentor, setMentor] = useState(null);
  const [mentorLoading, setMentorLoading] = useState(true);

  useEffect(() => {
    async function getMentor() {
      const res = await http("/user/mentor", "GET");

      setMentor(res);
      setMentorLoading(false);
    }

    getMentor();
  }, []);

  return (
    <>
      <Navbar user={user} />
      <section className="flex justify-center items-center h-screen bg-gray-800">
        <div>
          {mentorLoading ? (
            <h1 className="text-white text-4xl">Loading...</h1>
          ) : (
            <MentorCard user={mentor?.user} profile={mentor?.profile} />
          )}
        </div>
      </section>
    </>
  );
}
