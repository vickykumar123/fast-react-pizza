import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/users/UserName";
import { HiOutlineMoon } from "react-icons/hi2";
import DarkModeToggle from "./DarkModeToogle";
export default function Header() {
  return (
    <header className="flex justify-between border-b-2 border-gray-400 bg-yellow-400 px-3 py-4 text-sm uppercase dark:bg-gray-600 dark:text-yellow-50 sm:px-7 sm:text-xl">
      <Link to="/" className="flex-none tracking-widest">
        <em>
          <b>Fast Vicky Pizza co.</b>
        </em>
      </Link>
      <SearchOrder />
      <DarkModeToggle />
      <UserName />
    </header>
  );
}
