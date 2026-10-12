"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthForm({ mode }) {
  const isSignup = mode === "signup";
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (searchParams.get("redirected") === "1") toast("সুরক্ষিত পণ্য দেখতে সাইন ইন করুন।");
    if (searchParams.get("authUnavailable") === "1") toast.error("সাইন ইন সেবা প্রস্তুত নয়। .env-এ Atlas ও Better Auth সেটিংস দিন।");
  }, [searchParams]);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const credentials = { email: formData.get("email"), password: formData.get("password") };
    try {
      const result = isSignup
        ? await authClient.signUp.email({ ...credentials, name: formData.get("name"), callbackURL: "/" })
        : await authClient.signIn.email({ ...credentials, callbackURL: "/" });
      if (result.error) {
        toast.error(result.error.message || (isSignup ? "অ্যাকাউন্ট তৈরি করা যায়নি।" : "সাইন ইন করা যায়নি।"));
        return;
      }
      if (isSignup) await authClient.signOut();
      toast.success(isSignup ? "অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।" : "সাইন ইন সফল হয়েছে।");
      router.push(isSignup ? "/signin?registered=1" : "/");
      router.refresh();
    } catch {
      toast.error("সংযোগ করা যায়নি। Atlas ও Better Auth-এর .env সেটিংস যাচাই করুন।");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSocialSignIn(provider) {
    setIsSubmitting(true);
    try {
      const { error } = await authClient.signIn.social({ provider, callbackURL: "/" });
      if (error) toast.error(error.message || "সামাজিক মাধ্যমে সাইন ইন করা যায়নি।");
    } catch {
      toast.error("সংযোগ করা যায়নি। Atlas ও Better Auth-এর .env সেটিংস যাচাই করুন।");
    } finally {
      setIsSubmitting(false);
    }
  }

  return <div className="grid w-full max-w-[440px] justify-self-end rounded-[5px] border border-line bg-white p-[29px] shadow-[0_20px_60px_#1838200d] max-[760px]:justify-self-center max-[500px]:px-[17px] max-[500px]:py-[21px]">
    <div><span className="text-[0.78rem] font-extrabold text-green">বাজার দর</span><h1 className="mt-[6px] mb-1 text-[1.55rem] font-black text-green-deep">{isSignup ? "নতুন অ্যাকাউন্ট" : "আবার স্বাগতম"}</h1><p className="m-0 text-[0.82rem] text-muted">{isSignup ? "বাজারের দর জানতে আপনার তথ্য দিয়ে শুরু করুন।" : "আপনার অ্যাকাউন্টে সাইন ইন করুন।"}</p></div>
    <form className="mt-[23px] grid gap-[15px]" onSubmit={handleSubmit} onInvalid={() => toast.error("সব তথ্য সঠিকভাবে পূরণ করুন।")}>
      {isSignup && <label className="grid gap-[6px] text-[0.8rem] font-bold text-[#35443a]">নাম<input className="min-h-11 w-full rounded-[3px] border border-[#dfe4da] bg-white px-3 text-[0.87rem] text-ink outline-none placeholder:text-[#9aa39b] focus:border-[#6c9777] focus:shadow-[0_0_0_3px_#205b3b14]" name="name" autoComplete="name" required minLength={2} placeholder="আপনার নাম" /></label>}
      <label className="grid gap-[6px] text-[0.8rem] font-bold text-[#35443a]">ইমেইল<input className="min-h-11 w-full rounded-[3px] border border-[#dfe4da] bg-white px-3 text-[0.87rem] text-ink outline-none placeholder:text-[#9aa39b] focus:border-[#6c9777] focus:shadow-[0_0_0_3px_#205b3b14]" name="email" type="email" autoComplete="email" required placeholder="name@example.com" /></label>
      <label className="grid gap-[6px] text-[0.8rem] font-bold text-[#35443a]">পাসওয়ার্ড<input className="min-h-11 w-full rounded-[3px] border border-[#dfe4da] bg-white px-3 text-[0.87rem] text-ink outline-none placeholder:text-[#9aa39b] focus:border-[#6c9777] focus:shadow-[0_0_0_3px_#205b3b14]" name="password" type="password" autoComplete={isSignup ? "new-password" : "current-password"} required minLength={8} placeholder="কমপক্ষে ৮ অক্ষর" /></label>
      <button className="inline-flex min-h-[45px] items-center justify-center rounded-[3px] bg-green px-4 text-[0.87rem] font-extrabold text-white transition hover:bg-green-deep disabled:cursor-wait disabled:opacity-65" type="submit" disabled={isSubmitting}>{isSubmitting ? "অপেক্ষা করুন..." : isSignup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}</button>
    </form>
    <div className="my-[18px] flex items-center gap-[11px] text-[0.72rem] text-[#8c968d]"><span className="h-px flex-1 bg-line" />অথবা<span className="h-px flex-1 bg-line" /></div>
    <div className="grid grid-cols-2 gap-[9px]"><button className="flex min-h-[42px] items-center justify-center gap-[9px] rounded-[3px] border border-line bg-white text-[0.81rem] font-bold text-[#344239] hover:bg-[#f5f7f1] disabled:cursor-wait" type="button" onClick={() => handleSocialSignIn("google")} disabled={isSubmitting}><FaGoogle /> Google</button><button className="flex min-h-[42px] items-center justify-center gap-[9px] rounded-[3px] border border-line bg-white text-[0.81rem] font-bold text-[#344239] hover:bg-[#f5f7f1] disabled:cursor-wait" type="button" onClick={() => handleSocialSignIn("github")} disabled={isSubmitting}><FaGithub /> GitHub</button></div>
    <p className="mt-[18px] mb-0 text-center text-[0.78rem] text-muted">{isSignup ? "আগে থেকেই অ্যাকাউন্ট আছে?" : "নতুন এখানে?"} <Link className="font-extrabold text-green" href={isSignup ? "/signin" : "/signup"}>{isSignup ? "সাইন ইন করুন" : "অ্যাকাউন্ট তৈরি করুন"}</Link></p>
  </div>;
}