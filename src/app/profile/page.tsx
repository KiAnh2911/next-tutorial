import { cookies } from "next/headers";
import Profile from "./profile";
import accountApiRequest from "@/apiRequest/account";
import ProfileForm from "./profile-form";

export default async function MeProfile() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");

  const result = await accountApiRequest.profile(sessionToken?.value ?? "");

  return (
    <div>
      Xin chào {result.payload?.data?.name} - {result.payload?.data?.email}
      <ProfileForm profile={result?.payload?.data} />
    </div>
  );
}
