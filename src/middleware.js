import { NextResponse } from "next/server";

export default middleware = (request) => {
  const token = request.cookies.get("token");
  if (!token?.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
};

export const config = {
  matcher: ["/movies"],
};
