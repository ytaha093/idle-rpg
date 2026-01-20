export const authCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",                  // cookie valid site-wide
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
} as const;
