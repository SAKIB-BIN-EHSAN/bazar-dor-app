import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileUpdateForm from "@/components/profile-update-form";
import { auth, isAuthConfigured } from "@/lib/auth";

export const instant = false;

export default async function UpdateProfilePage() {
  let session;
  if (!isAuthConfigured()) redirect("/signin?authUnavailable=1");
  try {
    session = await auth.api.getSession({ headers: await headers() });
  } catch {
    redirect("/signin?authUnavailable=1");
  }
  if (!session) redirect("/signin?redirected=1");

  return <main className="min-h-[calc(100vh-120px)] pt-[34px]">
    <div className="mx-auto w-[calc(100%_-_2rem)] max-w-[1180px] min-[641px]:w-[calc(100%_-_3rem)]">
        <span className="text-[0.78rem] font-extrabold text-green">অ্যাকাউন্ট সেটিংস</span>
        <h1 className="mt-1 mb-6 text-[2rem] font-black text-green-deep">তথ্য আপডেট</h1>
        <ProfileUpdateForm name={session.user.name} />
    </div>
</main>;
}