import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth();

  

  return (
    <>
      <nav className="h-[8vh] bg-slate-400 pl-4 pr-4 flex items-center justify-around ">
        <h1>Logo</h1>

        <Link href="/About">About</Link>
        <Link href="/dashboard">dashboard</Link>
        <div className="flex gap-4 items-center justify-center">
          {!session ? (
            <Link href="/api/auth/signin" className="mr-5">
              <Button variant="outline" >Sign In</Button>
            </Link>
          ) : (
            <div>
              {session && session.user && session.user.image && (
                <Image
                  alt="profile-image"
                  width={50}
                  height={50}
                  src={`${session.user.image}`}
                  className="h-12 w-12 rounded-full object-cover "
                />
              )}
            </div>
          )}

          <Link href="/api/auth/signout">
            <Button variant="outline">Sign Out</Button>
          </Link>
        </div>
      </nav>
      <div className="h-[96vh] flex flex-col gap-3 items-center justify-center">
        <p>This is Home page</p>
        <div className="flex flex-col gap-5">
          {session && session.user && session.user.name && (
            <p>Welcome {session.user.name}!</p>
          )}
        </div>
      </div>
    </>
  );
}
