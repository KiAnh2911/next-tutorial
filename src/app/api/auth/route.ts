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

  return Response.json(body, {
    status: 200,
    headers: { "Set-Cookie": `sessionToken=${sessionToken}; Path=/; HttpOnly` },
  });
}
