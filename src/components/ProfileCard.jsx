// TODO validation
// TODO FULL NAME FOR USER
/* eslint-disable react/prop-types */

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
      <div>
        <p className="text-white">Bio: </p>
        <p className="text-white">{profile.bio}</p>
      </div>
    </div>
  );
}
