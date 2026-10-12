import Link from "next/link";
import { Suspense } from "react";
import AuthForm from "@/components/auth-form";

export default function SignInPage() {
  return <main className="grid min-h-[630px] grid-cols-[1fr_0.85fr] items-center gap-[9vw] bg-[radial-gradient(ellipse_at_10%_15%,#e5ead5_0,transparent_47%),var(--color-paper)] px-[max(24px,calc((100vw-1120px)/2))] pt-[55px] pb-[65px] max-[760px]:grid-cols-1 max-[760px]:gap-[26px] max-[760px]:px-4 max-[760px]:pt-[38px]">
    <div className="max-w-[470px] max-[760px]:max-w-[540px]"><span className="text-[0.78rem] font-extrabold text-green">বাজারদর আপনার হাতেই</span><h2 className="my-[13px] text-[3.7rem] font-black leading-[1.25] text-green-deep max-[760px]:text-[2.5rem] max-[500px]:text-[2.15rem]">বাজার হোক<br />আরও <em className="not-italic text-green">পরিকল্পিত।</em></h2><p className="max-w-[390px] text-[0.96rem] leading-[1.9] text-muted">আজকের দাম, বাজারভিত্তিক তুলনা, সব এক জায়গায়।</p><Link className="mt-[15px] inline-flex gap-[10px] text-[0.86rem] font-extrabold text-green" href="/">বাজারদর ঘুরে দেখুন <span>→</span></Link></div>
    <Suspense fallback={<div className="h-[405px] w-full max-w-[440px] justify-self-end animate-shimmer rounded-[5px] bg-[#e7eae2] max-[760px]:justify-self-center" />}><AuthForm mode="signin" /></Suspense>
  </main>;
}