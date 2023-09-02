import { formatCurrency } from "../../utils/helpers.js";
function OrderItem({ item, isLoadingImage, ingredients, imageUrl }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li>
      <div className="flex items-center justify-between gap-4 space-y-6">
        <p>
          {!isLoadingImage && (
            <img
              src={imageUrl}
              alt={name}
              className="m-1 inline-block h-11 rounded-2xl"
            />
          )}
          <span>{quantity}&times;</span> {name}
          <span className="ml-14 block text-sm capitalize italic">
            {!isLoadingImage ? ingredients.join(", ") : "Loading..."}
          </span>
        </p>
        <p className="text-sm font-semibold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
