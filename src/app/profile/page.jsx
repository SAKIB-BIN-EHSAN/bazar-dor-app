import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FaArrowRight, FaUser } from "react-icons/fa6";
import { auth, isAuthConfigured } from "@/lib/auth";

export const instant = false;

export default async function ProfilePage() {
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
        <span className="text-[0.78rem] font-extrabold text-green">আপনার অ্যাকাউন্ট</span>
        <h1 className="mt-1 mb-6 text-[2rem] font-black text-green-deep">আমার প্রোফাইল</h1>
        <section className="grid max-w-[760px] grid-cols-[64px_1fr_auto] items-center gap-[19px] rounded-[5px] border border-line bg-white p-[22px] max-[500px]:grid-cols-[48px_1fr] max-[500px]:gap-3 max-[500px]:p-4">
            <span className="grid size-[58px] place-items-center rounded-full bg-[#edf2e4] text-green max-[500px]:size-[45px]">
                <FaUser />
            </span>
            <div className="grid gap-[3px]">
                <span className="mt-1 text-[0.7rem] text-muted">নাম</span>
                <strong className="text-[0.9rem] text-green-deep">{session.user.name}</strong>
                <span className="mt-1 text-[0.7rem] text-muted">ইমেইল</span>
                <strong className="text-[0.9rem] text-green-deep">{session.user.email}</strong>
            </div>
            <Link className="inline-flex items-center gap-2 rounded-[3px] bg-green px-3 py-[10px] text-[0.78rem] font-extrabold text-white max-[500px]:col-span-full max-[500px]:justify-center" href="/profile/update">তথ্য আপডেট করুন <FaArrowRight />
            </Link>
        </section>
    </div>
</main>;
}