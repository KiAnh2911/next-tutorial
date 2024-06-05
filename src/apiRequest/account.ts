import https from "@/lib/https";
import {
  AccountResType,
  UpdateMeBodyType,
} from "@/schemaValidations/account.schema";

const accountApiRequest = {
  profile: (sessionToken: string) =>
    https.get<AccountResType>("account/me", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

  profileClient: () => https.get<AccountResType>("account/me"),

  updateProfile: (body: UpdateMeBodyType) =>
    https.put<AccountResType>("account/me", body),
};

export default accountApiRequest;
