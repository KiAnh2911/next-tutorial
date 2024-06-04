"use client";

import { useEffect } from "react";
import { useAppContext } from "../AppProvider";
import accountApiRequest from "@/apiRequest/account";

export default function Profile() {
  useEffect(() => {
    async function fetchRequest() {
      const result = await accountApiRequest.profileClient();
      console.log(result);
    }
    fetchRequest();
  }, []);

  return <div>Profile</div>;
}
