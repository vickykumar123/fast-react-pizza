import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
function Menu() {
  const menu = useLoaderData();
  // console.log(menu);
  return (
    <>
      <h1 className="m-2 text-center text-2xl font-bold">Menu</h1>
      <ul className="divide-y divide-stone-300 px-2 ">
        {menu.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.id} />
        ))}
      </ul>
    </>
  );
  // return null;
}

async function loader() {
  const menu = await getMenu();

  return menu;
}

export default Menu;
export { loader };
