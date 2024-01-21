"use client"
import AppWriteAuth from "@/appwrite/auth.service";
import { useEffect } from "react";

const Jobs = () => {
  const account = new AppWriteAuth();
  useEffect(() => {
    const getUserData = async () => {
      const user = await account.getUser();
      user && console.log(user)
    }
    getUserData();
  })
  return <div>Hello, Jobs Page</div>;
};

export default Jobs;
