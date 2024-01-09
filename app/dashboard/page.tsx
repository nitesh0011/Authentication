import { auth } from "@/auth";
import { redirect } from "next/navigation";
const page = async () => {
  const session =await auth();
  return (
    <>
    {!session ? (
        redirect("/api/auth/signin")
      ) : (
        <div className="h-[100vh]  flex items-center justify-around">
          this is dashboard page
        </div>
      )}
    
    </>
    
  )
}

export default page
