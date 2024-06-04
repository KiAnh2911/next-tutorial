"use client";

import { useEffect } from "react";
import accountApiRequest from "@/apiRequest/account";
import { handleErrorApi } from "@/lib/utils";

export default function Profile() {
  useEffect(() => {
    async function fetchRequest() {
      try {
        const result = await accountApiRequest.profileClient();
        console.log(result);
      } catch (error) {
        handleErrorApi({ error });
      }
    }
    fetchRequest();
  }, []);

  return <div>Profile</div>;
}
