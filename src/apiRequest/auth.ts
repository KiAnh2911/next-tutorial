import https from "@/lib/https";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
  SlideSessionResType,
} from "@/schemaValidations/auth.schema";
import { MessageResType } from "@/schemaValidations/common.schema";

const authApiRequest = {
  login: (body: LoginBodyType) => https.post<LoginResType>("auth/login", body),

  register: (body: RegisterBodyType) =>
    https.post<RegisterResType>("auth/register", body),

  auth: (body: { sessionToken: string; expiresAt: string }) =>
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

  slideSessionFromNextServerToServer: (sessionToken: string) =>
    https.post<SlideSessionResType>(
      "/auth/slide-session",
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    ),

  slideSessionFromNextClientToNextServer: () =>
    https.post<SlideSessionResType>(
      "/api/auth/slide-session",
      {},
      {
        baseUrl: "",
      }
    ),
};

export default authApiRequest;
