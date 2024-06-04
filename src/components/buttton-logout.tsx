import React from "react";
import { Button } from "./ui/button";
import { handleErrorApi } from "@/lib/utils";
import authApiRequest from "@/apiRequest/auth";
import { useRouter } from "next/navigation";

export default function ButttonLogout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authApiRequest.logoutFromNextClientToNextServer();
      router.push("/login");
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  return (
    <Button size={"sm"} onClick={handleLogout}>
      Đăng xuất
    </Button>
  );
}
