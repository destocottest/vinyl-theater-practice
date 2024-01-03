import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";
export const { auth } = NextAuth(authConfig);

const publicRoutes = ["/", "/signin", "/signup"];

export default auth((req) => {
  const { auth, nextUrl } = req;
  const { pathname } = nextUrl;

  if (pathname.startsWith("/api/auth")) return null;

  if (!auth && !publicRoutes.includes(pathname)) {
    return Response.redirect(new URL("/signin", nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
