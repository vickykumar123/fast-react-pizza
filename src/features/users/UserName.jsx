import { useSelector } from "react-redux";

export default function UserName() {
  const username = useSelector((state) => state.user.username);

  if (!username) return null;
  return (
    <div className="hidden rounded-full bg-yellow-200 px-4 py-2 text-sm font-bold  dark:text-gray-600 md:block">
      {username}
    </div>
  );
}
