import { formatCurrency } from "../../utils/helpers";
import DeleteCartItem from "./DeleteCartItem";
import UpdateCartQuantity from "./UpdateCartQuantity";

function CartItem({ item, imageUrl, isLoadingImage, ingredients }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="space-x-10 py-4 sm:flex sm:items-center sm:justify-between">
      <p className="relative space-y-0 ">
        {!isLoadingImage && (
          <img
            src={imageUrl}
            alt={name}
            className="mx-2 inline-block h-11 rounded-xl"
          />
        )}
        {quantity}&times; {name}
        <p className="ml-14 space-y-2 text-sm capitalize italic">
          {!isLoadingImage ? ingredients.join(", ") : "Loading..."}
        </p>
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateCartQuantity pizzaId={pizzaId} />
        <DeleteCartItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
