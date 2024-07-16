import React, { useState, useEffect } from "react";
import { Card, Button } from "flowbite-react";
import axios from "axios";

const CardComponent = ({
  dishId,
  imgSrc,
  dishName,
  isPublished,
  fetchDishes,
}) => {
  const [isChecked, setIsChecked] = useState(isPublished);

  useEffect(() => {
    setIsChecked(isPublished);
  }, [isPublished]);

  const handleCheckboxChange = () => {
    axios
      .put("http://localhost:8080/toggle-dish-status", {
        dishId: dishId,
        isPublished: !isChecked,
      })
      .then((response) => {
        fetchDishes();
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div key={dishId}>
      <Card className="flex flex-col max-w-sm rounded-lg overflow-hidden shadow-2xl text-black">
        <img
          src={imgSrc}
          alt={`Image of ${dishName}`}
          className="w-60 h-48 object-cover"
        />
        <div className="p-4">
          <h5 className="p-1 text-2xl font-bold tracking-tight text-gray-900">
            {dishName}
          </h5>
          <p className="p-1 font-normal text-gray-700 ">
            {isPublished
              ? "This dish is published"
              : "This dish is not published"}
          </p>
          <label className="p-1 flex cursor-pointer select-none items-center">
            <div className="relative">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="sr-only"
              />
              <div
                className={`block h-8 w-14 rounded-full ${
                  isChecked ? "bg-green-500" : "bg-[#E5E7EB]"
                }`}></div>
              <div
                className={`dot absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${
                  isChecked ? "translate-x-full" : ""
                }`}></div>
            </div>
          </label>
        </div>
      </Card>
    </div>
  );
};

export default CardComponent;
