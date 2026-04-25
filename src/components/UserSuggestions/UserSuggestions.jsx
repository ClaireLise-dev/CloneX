import useUsers from "../../Hooks/useUsers";
import useFollows from "../../Hooks/useFollows";
import FollowingButtonAdd from "../FollowingButtonAdd/FollowingButtonAdd";
import { AuthContext } from "../../store/AuthProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

export default function UsersSuggestions({ limit = 5, mobile = false }) {
  //Contextes
  const { user } = useContext(AuthContext);

  // Variables
  const { users } = useUsers();
  const navigate = useNavigate();
  const { followings } = useFollows(user?.uid);
  const userAlreadyFollowedIds =
    followings?.map((following) => following.id) ?? [];
  const filteredUsers = users?.filter(
    (u) => u.id !== user?.uid && !userAlreadyFollowedIds.includes(u.id),
  );

  return (
    <>
      {filteredUsers?.length > 0 && (
        <div
          className={`flex flex-col bg-base-300 p-5 shadow-xl rounded-2xl ${
            mobile ? "w-full mb-3" : "w-80 mt-18"
          }`}
        >
          {mobile && (
            <h3 className="font-bold text-base-content mb-3">
              Suggestion pour toi
            </h3>
          )}
          <div className="flex flex-col  gap-5 mb-3">
            {filteredUsers?.slice(0, limit).map((user) => (
              <div
                key={user.id}
                className="flex flex-row justify-between items-center"
              >
                <div className="flex flex-row">
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
                    <span className="text-sm text-neutral">
                      @{user?.Pseudo}
                    </span>
                  </div>
                </div>
                <div>
                  <FollowingButtonAdd uid={user.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
