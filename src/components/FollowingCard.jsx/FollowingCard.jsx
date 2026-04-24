import useUserProfile from "../../Hooks/useUserProfile";
import { useNavigate } from "react-router-dom";

export default function FollowingCard({ uid }) {
  // Variables
  const { userProfile } = useUserProfile(uid);
  const navigate = useNavigate();

  return (
    <div className="flex flex-row mb-3 cursor-pointer">
      <div className="w-12">
        <img
          src={userProfile?.AvatarUrl}
          alt="Avatar"
          onClick={() => navigate(`/profile/${uid}`)}
        />
      </div>

      <div className="flex flex-col ml-3">
        <span className="font-medium text-base-content">
          {userProfile?.Pseudo}
        </span>
        <span className="text-sm text-neutral">@{userProfile?.Pseudo}</span>
      </div>
    </div>
  );
}
