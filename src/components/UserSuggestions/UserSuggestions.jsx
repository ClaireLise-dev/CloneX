import useUsers from "../../Hooks/useUsers";

import { useNavigate } from "react-router-dom";

export default function UsersSuggestions() {
  // Variables
  const { users } = useUsers();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-base-300 p-5 mt-18 shadow-xl rounded-2xl w-80">
      <div className="flex flex-col  gap-5 mb-3">
        {users?.slice(0, 5).map((user) => (
          <div key={user.id} className="flex flex-row">
            <img
              src={user?.AvatarUrl}
              alt="Avatar"
              className="h-12 w-12 rounded-full shrink-0 cursor-pointer"
              onClick={() => navigate(`/profile/${user?.id}`)}
            />
            <div className="flex flex-col ml-3">
              <span className="font-medium text-base-content">
                {user?.Pseudo}
              </span>
              <span className="text-sm text-neutral">@{user?.Pseudo}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
