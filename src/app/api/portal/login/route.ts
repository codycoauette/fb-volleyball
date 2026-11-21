import {
  checkPortalPassword,
  createSessionToken,
  isUsingDefaultPassword,
  PORTAL_COOKIE,
  SESSION_MAX_AGE,
} from "@/content/auth";

export async function POST(request: Request) {
  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Expected JSON." }, { status: 400 });
  }

  if (!checkPortalPassword(String(body.password ?? ""))) {
    return Response.json(
      { error: "That password does not match." },
      { status: 401 },
    );
  }

  const token = createSessionToken();
  const response = Response.json({
    ok: true,
    usingDefaultPassword: isUsingDefaultPassword(),
  });

  response.headers.append(
    "Set-Cookie",
    `${PORTAL_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_MAX_AGE}${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
  );

  return response;
}
