import Link from "next/link";

export default function NotFound() {
  return <main className="flex min-h-[calc(100vh-120px)] flex-col"><div className="grid min-h-[310px] content-center justify-items-center px-[18px] py-[45px] text-center"><span className="text-[4rem] font-black text-orange">৪০৪</span><h1 className="my-[10px] text-[1.45rem]">এই বাজারের ঠিকানা খুঁজে পাওয়া যায়নি</h1><p className="mb-5 mt-0 text-muted">লিংকটি ভুল হতে পারে, অথবা পৃষ্ঠাটি আর এখানে নেই।</p><Link className="rounded-[3px] bg-green px-[17px] py-3 font-extrabold text-white" href="/">হোম পেজে ফিরে যান</Link></div></main>;
}