"use client"
import AppWriteAuth from "@/appwrite/auth.service";
import { useEffect } from "react";

const Jobs = () => {
  const account = new AppWriteAuth();
  useEffect(() => {
    const getUser = async () => {
      const user = await account.getUser();
      user && console.log(user)
    }

    getUser();
  })
  return <div>Hello, Jobs Page</div>;
};

export default Jobs;
