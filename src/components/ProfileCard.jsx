// TODO validation
// TODO FULL NAME FOR USER
/* eslint-disable react/prop-types */
// {
//   "profile": {
//     "bio": "I am Denis",
//     "city_id": 1,
//     "country_id": 1,
//     "csap_track": "sales",
//     "first_priority": "strengths",
//     "gender": "male",
//     "id": 1,
//     "interests": [],
//     "role_id": 2,
//     "same_gender": "no_preference",
//     "same_role": "no_preference",
//     "same_theatre": "no_preference",
//     "second_priority": "none",
//     "strengths": [
//       "Problem-solving",
//       "Communication",
//       "Leadership"
//     ],
//     "theatre_id": 1,
//     "title": "Network Engineer",
//     "title_id": 1,
//     "user_id": 1
//   },
//   "user": {
//     "email": "denis@ianev.com",
//     "id": 1,
//     "type": "mentee"
//   }
// }

export function ProfileCard({ user, profile, heading = false }) {
  return (
    <div className="w-full bg-gray-900 rounded p-6 space-y-4 h-full">
      {heading && <h1 className="text-4xl text-white">Profile</h1>}
      <div>
        <p className="text-white">Email: {user.email}</p>
      </div>
      <div>
        <p className="text-white">Gender: {profile.gender}</p>
      </div>
      <div>
        <p className="text-white">Title: {profile.title}</p>
      </div>
      <div>
        <p className="text-white">CSAP Track: {profile.csap_track}</p>
      </div>
    </div>
  );
}
