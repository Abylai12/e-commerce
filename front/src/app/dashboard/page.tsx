"use client";
import { ProfileContext } from "@/context/profile-context";
import React, { useContext } from "react";

const Dashboard = () => {
  const { user } = useContext(ProfileContext);
  console.log(user);
  return <div className="text-4xl font-bold">Dashboard</div>;
};

export default Dashboard;
