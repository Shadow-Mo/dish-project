// src/components/Dashboard.jsx

import React, { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import axios from "axios";

const Dashboard = () => {
  const [dishes, setDishes] = useState();

  const fetchDishes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/get-dishes");
      setDishes(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="m-6">
        <h1 className="text-6xl text-black font-bold">Dishes</h1>
      </div>
      <div className="max-h-fit min-h-screen flex flex-wrap gap-10 justify-center w-full p-6">
        {dishes && dishes.map((dish, index) => (
          <CardComponent
            key={index}
            dishId={dish.dishId}
            imgSrc={dish.imageUrl}
            dishName={dish.dishName}
            isPublished={dish.isPublished}
            fetchDishes={fetchDishes}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
