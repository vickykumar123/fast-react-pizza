import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItems } from "./cartSlice";

export default function DeleteCartItem({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Button type="small" onClick={() => dispatch(deleteItems(pizzaId))}>
      Remove
    </Button>
  );
}
