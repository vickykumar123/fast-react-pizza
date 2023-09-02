import { Link } from "react-router-dom";

export default function Button({ children, disabled, to, type, onClick }) {
  const base =
    "inline-block rounded-full bg-yellow-400  font-semibold uppercase hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-1 disabled:cursor-not-allowed text-sm ";

  const style = {
    primary: base + " px-4 py-3 md:px-6 md:py-5",
    small: base + " px-4 py-2 md:px-6 md:py-4 text-xs",
    round: base + " px-2.5 py-1 md:px-3.5 md:py-2 text-sm",
    secondary:
      "inline-block rounded-full font-semibold uppercase focus:bg-yellow-300 hover:bg-yellow-300 text-stone-500 border-2 border-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-1 disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-4 text-sm",
  };
  if (to)
    return (
      <Link to={to} className={style[type]}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={style[type]} onClick={onClick}>
      {children}
    </button>
  );
}
