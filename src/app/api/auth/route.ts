import { decodeJWT } from "@/lib/utils";

type PayloutJWT = {
  iat: number;
  exp: number;
  tokenType: string;
  useId: number;
};

export async function POST(request: Request) {
  const body = await request.json();
  const sessionToken = body.sessionToken as string;

  if (!sessionToken) {
    return Response.json(
      { message: "không nhận được session token" },
      {
        status: 400,
      }
    );
  }

  const payload = decodeJWT<PayloutJWT>(sessionToken);
  const expriesDate = new Date(payload.exp * 1000).toUTCString();

  return Response.json(body, {
    status: 200,
    headers: {
      "Set-Cookie": `sessionToken=${sessionToken}; Path=/; HttpOnly; Expires=${expriesDate}; SameSite=Lax; Secure`,
    },
  });
}
