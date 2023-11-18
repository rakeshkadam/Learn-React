import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShimmerUI from "./ShimmerUI";
import { MENU_DETAILS_API } from "../utils/constants";

const RestaurantMenuCard = () => {
  const { restaurantId } = useParams();
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [restaurantMenu, setRestaurantMenu] = useState([]);

  const fetchMenu = async () => {
    const data = await fetch(MENU_DETAILS_API + restaurantId).then(
      (res) => res
    );
    const jsonData = await data.json();

    setRestaurantDetails(jsonData.data?.cards[0]?.card?.card?.info);
    setRestaurantMenu(
      jsonData?.data.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]
        ?.card?.card?.itemCards
    );
  };

  useEffect(() => {
    fetchMenu();
  }, [restaurantId]);

  if (restaurantDetails === null) {
    return <ShimmerUI />;
  }

  const { name, cuisines, costForTwoMessage } = restaurantDetails;

  return (
    <div className="menu-container">
      <h1>{name}</h1>
      <br></br>
      <h2>Cuisines: {cuisines?.join(", ")}</h2>
      <br></br>
      <h2>Cost for two: {costForTwoMessage}</h2>
      <br></br>
      <h2>Menu</h2>
      <br></br>
      <ul>
        {restaurantMenu.map((menu) => {
          const { name, defaultPrice, id, price } = menu?.card?.info;

          return (
            <li key={id}>
              name: {name}, price:{defaultPrice / 100 || price / 100}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RestaurantMenuCard;
