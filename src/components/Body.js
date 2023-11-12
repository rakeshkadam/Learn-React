import RestaurantCard from "./RestaurantCard";
import { restaurants } from "../utils/mockData";
import { useEffect, useState } from "react";
import ShimmerUI from "./ShimmerUI";

const Body = () => {
  const [resList, setResList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5204303&lng=73.8567437&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await response.json();
    console.log("sddsd", json);

    setResList(
      json.data.cards[2].card.card.gridElements.infoWithStyle.restaurants
    );
  };

  if (resList.length === 0) {
    return <ShimmerUI />;
  }

  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            const topRatedRestaurants = resList.filter(
              (res) => res.info.avgRating > 4
            );
            setResList(topRatedRestaurants);
          }}
        >
          Filter
        </button>
      </div>
      <div className="res-container">
        {resList.map((resData) => (
          <RestaurantCard resData={resData} key={resData.info.id} />
        ))}
      </div>
    </div>
  );
};

export default Body;
