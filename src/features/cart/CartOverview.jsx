import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalCartQuantity = useSelector((state) =>
    state.cart.cart.reduce((sum, curr) => sum + curr.quantity, 0),
  );
  const totalCartPrice = useSelector((state) =>
    state.cart.cart.reduce((sum, curr) => sum + curr.totalPrice, 0),
  );

  if (!totalCartQuantity) return;

  return (
    <div className="flex justify-between bg-stone-800 px-4 py-4 uppercase text-white sm:px-6">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
