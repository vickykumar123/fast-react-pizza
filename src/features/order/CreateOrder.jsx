import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { clearCart } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../users/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 30,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error,
  } = useSelector((state) => state.user);
  const navigation = useNavigation();
  // console.log(navigation);
  const isSubmitting = navigation.state === "submitting";
  const formError = useActionData();
  // console.log(formError);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const isLoadingAddress = addressStatus === "loading";
  console.log(isLoadingAddress);

  const totalCartPrice = useSelector((state) =>
    state.cart.cart.reduce((sum, curr) => sum + curr.totalPrice, 0),
  );
  const withPriorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + withPriorityPrice;
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="mx-7 my-6">
      <h2 className="mb-8 text-xl font-semibold ">Ready to order? Let's go!</h2>

      <Form method="POST">
        {/* this Form is from react router dom*/}
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" className="input w-full" required />
            {formError && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-500">
                {formError.phone}
              </p>
            )}
          </div>
        </div>
        <div className="relative mb-6 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              disabled={isLoadingAddress}
              defaultValue={address}
              type="text"
              name="address"
              required
              className="input w-full"
            />
            {error && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-500">
                {error}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-1 top-[33px] sm:top-[3px]">
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>
        <div className="mb-12 flex items-center gap-2">
          <input
            className="m-2 h-6 w-6 accent-yellow-400 focus:outline-none focus:outline-offset-2 focus:ring focus:ring-yellow-300"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">
            Want to you give your order priority?
          </label>
        </div>
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          {/* <input
            type="hidden"
            name="cart"
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ""
            } */}
          {/* /> */}
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting
              ? "Placing Order..."
              : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  console.log(order);
  // return null;
  const error = {};
  if (!isValidPhone(order.phone))
    error.phone =
      "Please provide your valid contact number, We need to contact you.";
  if (Object.keys(error).length > 0) return error;

  // if everything is okay, create new order.
  const newOrder = await createOrder(order);
  store.dispatch(clearCart()); // clearing the overview
  return redirect(`/order/${newOrder.id}`); //redirect is react-router-dom built-in function
}

export default CreateOrder;
