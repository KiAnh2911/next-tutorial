import accountApiRequest from "@/apiRequest/account";
import { ModeToggle } from "@/components/mode-toggle";
import { cookies } from "next/headers";
import Link from "next/link";
import ButttonLogout from "./buttton-logout";

export default async function Header() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value ?? "";
  let user = null;
  try {
    const { payload } = await accountApiRequest.profile(sessionToken);
    user = payload.data;
  } catch (error) {
    console.log("Header ~ error:", error);
  }
  return (
    <div className="px-10 py-2 space-x-4">
      <div className="flex justify-between space-x-4">
        <ul className="flex items-center flex-1 space-x-4">
          <li>
            <Link href="/products">Sản phẩm</Link>
          </li>

          <div className="flex items-center justify-end flex-1 gap-4">
            {user ? (
              <>
                <li>
                  <Link href={"/profile"}>
                    Xin chào <strong>{user.name}</strong>
                  </Link>
                </li>
                <li>
                  <ButttonLogout />
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login">Đăng nhập</Link>
                </li>
                <li>
                  <Link href="/register">Đăng ký</Link>
                </li>
              </>
            )}
          </div>
        </ul>
        <ModeToggle />
      </div>
    </div>
  );
}
