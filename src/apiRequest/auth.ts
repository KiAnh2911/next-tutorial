import https from "@/lib/https";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
} from "@/schemaValidations/auth.schema";
import { MessageResType } from "@/schemaValidations/common.schema";

const authApiRequest = {
  login: (body: LoginBodyType) => https.post<LoginResType>("auth/login", body),

  register: (body: RegisterBodyType) =>
    https.post<RegisterResType>("auth/register", body),

  auth: (body: { sessionToken: string }) =>
    https.post("api/auth", body, { baseUrl: "" }),

  logoutFromNextServerToServer: (sessionToken: string) =>
    https.post<MessageResType>(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    ),

  logoutFromNextClientToNextServer: (
    force?: boolean | undefined,
    signal?: AbortSignal | undefined
  ) =>
    https.post<MessageResType>(
      "/api/auth/logout",
      { force },
      {
        baseUrl: "",
      }
    ),
};

export default authApiRequest;
