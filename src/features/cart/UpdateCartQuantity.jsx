import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import {
  decreaseItemQuantity,
  getCurrentItemQuantity,
  increaseItemQuantity,
} from "./cartSlice";

export default function UpdateCartQuantity({ pizzaId }) {
  const dispatch = useDispatch();
  const quantity = useSelector(getCurrentItemQuantity(pizzaId));
  function handleDecrease() {
    if (quantity > 0) dispatch(decreaseItemQuantity(pizzaId));
  }

  function handleIncrease() {
    dispatch(increaseItemQuantity(pizzaId));
  }

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button type="round" onClick={handleDecrease}>
        -
      </Button>
      <span className="text-sm font-bold">{quantity}</span>
      <Button type="round" onClick={handleIncrease}>
        +
      </Button>
    </div>
  );
}
