import React from "react";
import DeliveryCard from "./delivery";
import VerifyPackCard from "./verifiedPackcard";

const AddressCard = () => {
  return (
    <div className="flex gap-3">
      <div>
        <VerifyPackCard />
      </div>
      <DeliveryCard />
    </div>
  );
};

export default AddressCard;
