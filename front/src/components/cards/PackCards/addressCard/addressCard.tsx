import React, { Dispatch, SetStateAction } from "react";
import DeliveryCard from "./delivery";
import VerifyPackCard from "./verifiedPackcard";
import { deliveryUserSchema } from "@/utils/validationSchema";
import { z } from "zod";

const AddressCard = ({
  setState,
}: {
  setState: Dispatch<SetStateAction<number>>;
}) => {
  const onSubmit = (values: z.infer<typeof deliveryUserSchema>) => {
    setState(3);
    console.log(values);
  };
  const handleBack = () => {
    setState(1);
  };
  return (
    <div className="flex gap-3">
      <div>
        <VerifyPackCard />
      </div>
      <DeliveryCard handleBack={handleBack} onSubmit={onSubmit} />
    </div>
  );
};

export default AddressCard;
