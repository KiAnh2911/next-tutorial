import authApiRequest from "@/apiRequest/auth";
import { HttpError } from "@/lib/https";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");

  if (!sessionToken) {
    return Response.json(
      { message: "không nhận được session token" },
      {
        status: 400,
      }
    );
  }
  try {
    const res = await authApiRequest.slideSessionFromNextServerToServer(
      sessionToken.value
    );

    const newExpiresDate = new Date(res.payload.data.expiresAt).toUTCString();

    return Response.json(res.payload, {
      status: 200,

      headers: {
        "Set-cookie": `sessionToken=${sessionToken.value}; Path=/; HttpOnly; Expires=${newExpiresDate}`,
      },
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json(
        {
          message: "Lỗi không xác định",
        },
        {
          status: 500,
        }
      );
    }
  }
}
