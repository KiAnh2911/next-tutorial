import { cookies } from "next/headers";
import Profile from "./profile";
import accountApiRequest from "@/apiRequest/account";

export default async function MeProfile() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  console.log("🚀 ~ MeProfile ~ sessionToken: 88238226238", sessionToken);

  const result = await accountApiRequest.profile(sessionToken?.value ?? "");
  console.log("🚀 ~ MeProfile ~ result:", result);

  return (
    <div>
      Xin chào {result.payload?.data?.name} - {result.payload?.data?.email}
      {/* <Profile /> */}
    </div>
  );
}
