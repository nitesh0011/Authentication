import { NextResponse } from "next/server";
import squareWasm from './square.wasm?module'
export default async function middleware(req: { auth: any }) {
  const isLoggedIn = !!req.auth;

  if (isLoggedIn) {
    // Proceed with middleware logic if user is authenticated
    const m = await WebAssembly.instantiate(squareWasm);
    const answer = m.exports.square(9);

    const response = NextResponse.next();
    response.headers.set('x-square', answer.toString());
    return response;
  } else {
    // Handle unauthorized access
    // ...
  }
}


export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
    runtime: 'experimental-edge', // for Edge API Routes only
    unstable_allowDynamic: [
    '/lib/utilities.js', // allows a single file
    '/node_modules/function-bind/**', // use a glob to allow anything in the function-bind 3rd party module
  ],
}