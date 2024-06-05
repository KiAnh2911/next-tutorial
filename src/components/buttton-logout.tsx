import { Button } from "./ui/button";
import { handleErrorApi } from "@/lib/utils";
import authApiRequest from "@/apiRequest/auth";
import { usePathname, useRouter } from "next/navigation";

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
    }
  };

  return (
    <Button size={"sm"} onClick={handleLogout}>
      Đăng xuất
    </Button>
  );
}
