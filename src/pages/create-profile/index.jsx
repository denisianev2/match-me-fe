import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { http } from "../../utils/http";
import { useAuthGuard } from "../../utils/useAuthGuard";
import Button from "../../components/Button";

export default function CreateProfile() {
  const [roles, setRoles] = useState([]);
  const [titles, setTitles] = useState([]);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [strengths, setStrengths] = useState([]);
  const [interests, setInterests] = useState([]);
  const [selectedStrengths, setSelectedStrengths] = useState(new Set());
  const [selectedInterests, setSelectedInterests] = useState(new Set());

  const roleRef = useRef();
  const titleRef = useRef();
  const genderRef = useRef();
  const cityRef = useRef();
  const countryRef = useRef();
  const theatreRef = useRef();
  const bioRef = useRef();
  const csapRef = useRef();
  const sameTheatreRef = useRef();
  const sameGenderRef = useRef();
  const sameRoleRef = useRef();
  const firstPriorityRef = useRef();
  const secondPriorityRef = useRef();

  useAuthGuard();

  async function fetchRoles() {
    const res = await http("/common/roles", "GET");

    if (res.error) {
      toast.error(res.error);
      return;
    }

    setRoles(res);
  }

  async function fetchTitles() {
    const res = await http("/common/titles", "GET");

    if (res.error) {
      toast.error(res.error);
      return;
    }

    setTitles(res);
  }

  async function fetchCities() {
    const res = await http("/common/cities", "GET");

    if (res.error) {
      toast.error(res.error);
      return;
    }

    setCities(res);
  }

  async function fetchCountries() {
    const res = await http("/common/countries", "GET");

    if (res.error) {
      toast.error(res.error);
      return;
    }

    setCountries(res);
  }

  async function fetchTheatres() {
    const res = await http("/common/theatres", "GET");

    if (res.error) {
      toast.error(res.error);
      return;
    }

    setTheatres(res);
  }

  async function fetchStrengths() {
    const res = await http("/common/strengths", "GET");

    if (res.error) {
      toast.error(res.error);
      return;
    }

    setStrengths(res);
  }

  async function fetchInterests() {
    const res = await http("/common/interests", "GET");

    if (res.error) {
      toast.error(res.error);
      return;
    }

    setInterests(res);
  }

  useEffect(() => {
    fetchRoles();
    fetchTitles();
    fetchCities();
    fetchCountries();
    fetchTheatres();
    fetchStrengths();
    fetchInterests();
  }, []);

  async function createProfile() {
    const res = await http("/user/profile", "POST", {
      role_id: roleRef.current.value,
      title_id: titleRef.current.value,
      gender: genderRef.current.value,
      city_id: cityRef.current.value,
      country_id: countryRef.current.value,
      theatre_id: theatreRef.current.value,
      bio: bioRef.current.value,
      csap_track: csapRef.current.value,
      same_theatre: sameTheatreRef.current.value,
      same_gender: sameGenderRef.current.value,
      same_role: sameRoleRef.current.value,
      first_priority: firstPriorityRef.current.value,
      second_priority: secondPriorityRef.current.value,
      strengths: [...selectedStrengths].map((s) => s.id),
      interests: [...selectedInterests].map((i) => i.id),
    });

    if (res.error) {
      toast.error(res.error);
      return;
    }

    toast.success("Profile Created!");
    window.location.href = "/app";
  }

  return (
    <>
      <section className="flex justify-center items-center min-h-screen bg-gray-800">
        <div className="max-w-md w-full bg-gray-900 rounded p-6 space-y-4">
          <div className="mb-4">
            <p className="text-gray-400">Create Profile</p>
          </div>
          <label className="text-gray-400">
            <div>Select Role:</div>
            <select className="p-2 rounded-md" ref={roleRef}>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-gray-400">
            <div>Select Title:</div>
            <select className="p-2 rounded-md" ref={titleRef}>
              {titles.map((title) => (
                <option key={title.id} value={title.id}>
                  {title.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-gray-400">
            <div>Gender:</div>
            <select
              defaultValue="male"
              className="p-2 rounded-md"
              ref={genderRef}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label className="text-gray-400">
            <div>Select City:</div>
            <select className="p-2 rounded-md" ref={cityRef}>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-gray-400">
            <div>Select Country:</div>
            <select className="p-2 rounded-md" ref={countryRef}>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-gray-400">
            <div>Select Theatre:</div>
            <select
              defaultValue="1"
              className="p-2 rounded-md"
              ref={theatreRef}
            >
              {theatres.map((theatre) => (
                <option key={theatre.id} value={theatre.id}>
                  {theatre.name}
                </option>
              ))}
            </select>
          </label>
          <div>
            <label>
              <div className="text-gray-400">Bio:</div>
              <textarea
                className="rounded w-full h-32 resize-none"
                ref={bioRef}
              />
            </label>
          </div>
          <div>
            <p className="text-gray-400">Selected Strengths:</p>
            <ul>
              {[...selectedStrengths].map((strength) => (
                <>
                  <li
                    className="text-gray-300 flex justify-between my-2"
                    key={strength.id}
                  >
                    {strength.name}
                    <Button
                      className={"bg-red-600 w-8"}
                      onClick={() => {
                        setSelectedStrengths(
                          new Set(
                            [...selectedStrengths].filter(
                              (s) => s.id !== strength.id
                            )
                          )
                        );
                      }}
                    >
                      X
                    </Button>
                  </li>
                </>
              ))}
            </ul>
          </div>
          <label className="text-gray-400">
            <div>Select Strengths:</div>
            <select
              className="p-2 rounded-md"
              onChange={(e) => {
                const strength = strengths.find(
                  (strength) => strength.id === parseInt(e.target.value)
                );

                setSelectedStrengths(new Set([...selectedStrengths, strength]));
              }}
            >
              {strengths.map((strength) => (
                <option key={strength.id} value={strength.id}>
                  {strength.name}
                </option>
              ))}
            </select>
          </label>
          <div>
            <p className="text-gray-400">Selected Interests:</p>
            <ul>
              {[...selectedInterests].map((interest) => (
                <>
                  <li
                    className="text-gray-300 flex justify-between my-2"
                    key={interest.id}
                  >
                    {interest.name}
                    <Button
                      className={"bg-red-600 w-8"}
                      onClick={() => {
                        setSelectedInterests(
                          new Set(
                            [...selectedInterests].filter(
                              (s) => s.id !== interest.id
                            )
                          )
                        );
                      }}
                    >
                      X
                    </Button>
                  </li>
                </>
              ))}
            </ul>
          </div>
          <label className="text-gray-400">
            <div>Select Interests:</div>
            <select
              className="p-2 rounded-md"
              onChange={(e) => {
                const interest = interests.find(
                  (strength) => strength.id === parseInt(e.target.value)
                );

                setSelectedInterests(new Set([...selectedInterests, interest]));
              }}
            >
              {interests.map((interest) => (
                <option key={interest.id} value={interest.id}>
                  {interest.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-gray-400">
            <div>CSAP Track:</div>
            <select
              defaultValue="engineer"
              className="p-2 rounded-md"
              ref={csapRef}
            >
              <option value="engineer">Engineer</option>
              <option value="sales">Sales</option>
            </select>
          </label>
          <label className="text-gray-400">
            <div>First Priority:</div>
            <select className="p-2 rounded-md" ref={firstPriorityRef}>
              <option value="role">Role</option>
              <option value="strengths">Strengths</option>
              <option value="gender">Gender</option>
              <option value="theater">Theater</option>
              <option value="none">None</option>
            </select>
          </label>
          <label className="text-gray-400">
            <div>Second Priority:</div>
            <select className="p-2 rounded-md" ref={secondPriorityRef}>
              <option value="role">Role</option>
              <option value="strengths">Strengths</option>
              <option value="gender">Gender</option>
              <option value="theater">Theater</option>
              <option value="none">None</option>
            </select>
          </label>
          <label className="text-gray-400">
            <div>Same Theatre:</div>
            <select className="p-2 rounded-md" ref={sameTheatreRef}>
              <option value="no_preference">No Preference</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
          <label className="text-gray-400">
            <div>Same Gender:</div>
            <select className="p-2 rounded-md" ref={sameGenderRef}>
              <option value="no_preference">No Preference</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
          <label className="text-gray-400">
            <div>Same Role:</div>
            <select className="p-2 rounded-md" ref={sameRoleRef}>
              <option value="no_preference">No Preference</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
          <div>
            <button
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200"
              onClick={createProfile}
            >
              Create Profile
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
