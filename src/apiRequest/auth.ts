import https from "@/lib/https";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
} from "@/schemaValidations/auth.schema";

const authApiRequest = {
  login: (body: LoginBodyType) => https.post<LoginResType>("auth/login", body),
  register: (body: RegisterBodyType) =>
    https.post<RegisterResType>("auth/register", body),

  auth: (body: { sessionToken: string }) =>
    https.post("api/auth", body, { baseUrl: "" }),
};

export default authApiRequest;
