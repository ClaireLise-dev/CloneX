import useFollows from "../../Hooks/useFollows";
import { AuthContext } from "../../store/AuthProvider";
import { useContext } from "react";
import { UserPlus } from "lucide-react";

export default function FollowingButtonAdd({ uid }) {
  // Variables
  const { user } = useContext(AuthContext);

  const { addFollow } = useFollows(user.uid, uid);

  return (
    <UserPlus
      size={30}
      color="#4D3FC7"
      onClick={() => addFollow(true)}
      className="cursor-pointer"
    />
  );
}
