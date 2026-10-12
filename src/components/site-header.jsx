"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import HeaderMarqueeText from "./header-marque-text";

export default function SiteHeader({ categories, tickerItems }) {
  const [date, setDate] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setDate(new Intl.DateTimeFormat("bn-BD", { dateStyle: "long", timeZone: "Asia/Dhaka" }).format(new Date()));
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  async function handleSignOut() {
    const { error } = await authClient.signOut();
    if (error) return toast.error(error.message || "সাইন আউট করা যায়নি।");
    toast.success("সাইন আউট সফল হয়েছে।");
    setMenuOpen(false);
    router.refresh();
  }

  const categoryLinkClasses = (active) => active
    ? "rounded-[3px] bg-soft-leaf px-[10px] py-2 text-[0.83rem] font-medium whitespace-nowrap text-green-deep transition-colors max-[1020px]:px-[7px] max-[1020px]:text-[0.75rem] max-[760px]:px-[7px] max-[760px]:py-[10px] max-[760px]:text-center"
    : "rounded-[3px] px-[10px] py-2 text-[0.83rem] font-medium whitespace-nowrap text-[#536058] transition-colors hover:bg-soft-leaf hover:text-green-deep max-[1020px]:px-[7px] max-[1020px]:text-[0.75rem] max-[760px]:px-[7px] max-[760px]:py-[10px] max-[760px]:text-center";

  return <header className="relative z-10 bg-white">
    <div className="mx-auto flex min-h-[82px] w-[calc(100%_-_2rem)] max-w-[1180px] items-center gap-[34px] min-[641px]:w-[calc(100%_-_3rem)] max-[1020px]:gap-[15px] max-[760px]:min-h-[70px] max-[760px]:justify-between">
      <Link className="grid flex-[0_0_176px] grid-cols-[42px_auto] grid-rows-[auto_auto] items-center gap-x-2 max-[1020px]:basis-[160px] max-[760px]:basis-auto" href="/" aria-label="বাজার দর হোম পেজ">
        <span className="row-span-2 grid size-10 place-items-center rounded bg-green text-[1.3rem]">🛒</span>
        <span className="self-end text-[1.2rem] font-black leading-[1.15] text-green-deep">বাজার দর</span>
        <span className="mt-[3px] self-start text-[0.69rem] text-muted">{date || "ঢাকার বাজারদর"}</span>
      </Link>
      <button className="hidden size-10 place-items-center rounded-[3px] border border-line bg-white text-base text-green max-[760px]:grid" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}>{menuOpen ? <FaXmark /> : <FaBars />}</button>
      <nav className={`flex flex-1 items-center justify-between gap-[22px] max-[1020px]:gap-[15px] max-[760px]:absolute max-[760px]:top-[70px] max-[760px]:right-0 max-[760px]:left-0 max-[760px]:items-stretch max-[760px]:border-t max-[760px]:border-line max-[760px]:bg-white max-[760px]:px-4 max-[760px]:pt-3 max-[760px]:pb-4 max-[760px]:shadow-[0_12px_20px_#13281918] ${menuOpen ? "max-[760px]:grid" : "max-[760px]:hidden"}`} aria-label="প্রধান নেভিগেশন">
        <div className="flex items-center pt-12 min-[760px]:pt-0 gap-1 max-[1020px]:flex-wrap max-[760px]:grid max-[760px]:grid-cols-3 max-[760px]:gap-[3px]">
          <Link className={categoryLinkClasses(pathname === "/")} href="/" aria-current={pathname === "/" ? "page" : undefined} onClick={() => setMenuOpen(false)}>সব পণ্য</Link>
          {categories.map((category) => <Link className={categoryLinkClasses(pathname === `/category/${category.slug}`)} key={category.slug} href={`/category/${category.slug}`} aria-current={pathname === `/category/${category.slug}` ? "page" : undefined} onClick={() => setMenuOpen(false)}>{category.nameBn}</Link>)}
        </div>
        <div className="flex items-center gap-[7px] whitespace-nowrap max-[760px]:justify-end max-[760px]:border-t max-[760px]:border-line max-[760px]:pt-[11px]">
          {session ? <><Link className="inline-flex min-h-[38px] items-center justify-center rounded-[3px] px-[13px] text-[0.83rem] font-bold text-green" href="/profile">আমার প্রোফাইল</Link><button className="inline-flex min-h-[38px] items-center justify-center rounded-[3px] bg-green px-[13px] text-[0.83rem] font-bold text-white hover:bg-green-deep" type="button" onClick={handleSignOut}>সাইন আউট</button></> : <><Link className="inline-flex min-h-[38px] items-center justify-center rounded-[3px] px-[13px] text-[0.83rem] font-bold text-green" href="/signin">সাইন ইন</Link><Link className="inline-flex min-h-[38px] items-center justify-center rounded-[3px] bg-green px-[13px] text-[0.83rem] font-bold text-white hover:bg-green-deep" href="/signup">সাইন আপ</Link></>}
        </div>
      </nav>
    </div>
    <HeaderMarqueeText tickerItems={tickerItems} />
  </header>;
}