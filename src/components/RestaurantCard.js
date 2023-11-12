import { CLOUD_IMG_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  const { name, cuisines, avgRating, costForTwo, sla, cloudinaryImageId } =
    resData.info;
  return (
    <div className="res-card">
      <img className="res-logo" src={CLOUD_IMG_URL + cloudinaryImageId} />
      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{costForTwo}</h4>
      <h4>{sla.deliveryTime}</h4>
    </div>
  );
};

export default RestaurantCard;
