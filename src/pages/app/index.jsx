import { useEffect, useState } from "react";
import { MentorCard } from "../../components/MentorCard";
import { MenteeCard } from "../../components/MenteeCard";

import Navbar from "../../components/Navbar";
import { useAuthGuard } from "../../utils/useAuthGuard";
import { http } from "../../utils/http";

export default function App() {
  const user = useAuthGuard();
  const [mentor, setMentor] = useState(null);
  const [mentees, setMentees] = useState([]);

  const [loading, setLoading] = useState(true);

  async function getMentor() {
    const res = await http("/user/mentor", "GET");

    setMentor(res);
    setLoading(false);
  }

  async function getMentees() {
    const res = await http("/user/mentees", "GET");

    setMentees(res);
    setLoading(false);
  }

  function removeMentor() {
    setMentor(null);
  }

  function removeMentee(index) {
    return () => {
      const newMentees = mentees.filter((_, i) => i !== index);
      setMentees(newMentees);
    };
  }

  useEffect(() => {
    if (user?.user.type === "mentee") {
      getMentor();
    }

    if (user?.user.type === "mentor") {
      getMentees();
    }
  }, [user?.user.type]);

  return (
    <>
      <Navbar user={user} />
      <section className="flex justify-center items-center min-h-screen bg-gray-800 mt-16">
        <div>
          {loading ? (
            <h1 className="text-white text-4xl">Loading...</h1>
          ) : (
            <>
              {user?.user.type === "mentee" ? (
                <>
                  <h1 className="text-white text-4xl text-center">
                    Your Mentor
                  </h1>
                  <MentorCard mentor={mentor} removeMentor={removeMentor} />
                </>
              ) : (
                <>
                  <h1 className="text-white text-4xl text-center">
                    Your Mentees
                  </h1>
                  {mentees.map((mentee, i) => (
                    <MenteeCard
                      key={mentee.id}
                      mentee={mentee}
                      removeMentee={removeMentee(i)}
                    />
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
