import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import ShimmerUI from "./ShimmerUI";
import { RES_LIST_API } from "../utils/constants";
import { Link } from "react-router-dom";

const Body = () => {
  const [resList, setResList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(RES_LIST_API);

    const jsonData = await response.json();

    const restaurantList =
      jsonData?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    setResList(restaurantList);
    setFilteredRestaurants(restaurantList);
  };

  return resList.length === 0 ? (
    <ShimmerUI />
  ) : (
    <div className="body">
      <div className="filter">
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="filter-btn"
          onClick={() => {
            const filteredResList = resList.filter((res) =>
              res?.info?.name
                ?.toLocaleLowerCase()
                .includes(searchText.toLocaleLowerCase())
            );
            setFilteredRestaurants(filteredResList);
          }}
        >
          Search
        </button>

        <button
          className="filter-btn"
          onClick={() => {
            const topRatedRestaurants = resList.filter(
              (res) => res.info.avgRating > 4
            );
            setFilteredRestaurants(topRatedRestaurants);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurants.map((resData) => (
          <Link to={"/restaurant/" + resData.info.id} key={resData.info.id}>
            <RestaurantCard resData={resData} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
