import https from "@/lib/https";
import { AccountResType } from "@/schemaValidations/account.schema";

const accountApiRequest = {
  profile: (sessionToken: string) =>
    https.get<AccountResType>("account/me", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
  profileClient: () => https.get<AccountResType>("account/me"),
};

export default accountApiRequest;
