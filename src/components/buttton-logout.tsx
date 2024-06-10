"use client";

import authApiRequest from "@/apiRequest/auth";
import { handleErrorApi } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function ButttonLogout() {
  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = async () => {
    try {
      await authApiRequest.logoutFromNextClientToNextServer();
      router.push("/login");
    } catch (error) {
      handleErrorApi({ error });
      await authApiRequest
        .logoutFromNextClientToNextServer(true)
        .then((res) => {
          router.push(`/login?redirectFrom=${pathname}`);
        });
    } finally {
      router.refresh();
    }
  };

  return (
    <Button size={"sm"} onClick={handleLogout}>
      Đăng xuất
    </Button>
  );
}
