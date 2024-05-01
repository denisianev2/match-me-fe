import { ProfileCard } from "../../components/ProfileCard";
import SkeletonText from "../../components/SkeletonText";

export default function ProfileTab({ user }) {
  return user ? (
    <ProfileCard user={user.user} profile={user.profile} heading />
  ) : (
    <SkeletonText />
  );
}
