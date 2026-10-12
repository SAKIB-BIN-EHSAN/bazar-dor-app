"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfileUpdateForm({ name }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    const formData = new FormData(event.currentTarget);
    const { error } = await authClient.updateUser({ name: String(formData.get("name")).trim() });
    setSaving(false);
    if (error) return toast.error(error.message || "তথ্য আপডেট করা যায়নি।");
    toast.success("আপনার নাম আপডেট হয়েছে।");
    router.push("/profile");
    router.refresh();
  }

  return <form className="grid max-w-[470px] gap-[18px] rounded-[5px] border border-line bg-white p-[23px]" onSubmit={handleSubmit}>
    <label className="grid gap-[6px] text-[0.8rem] font-bold text-[#35443a]">নাম
        <input className="min-h-11 w-full rounded-[3px] border border-[#dfe4da] bg-white px-3 text-[0.87rem] text-ink outline-none focus:border-[#6c9777] focus:shadow-[0_0_0_3px_#205b3b14]" name="name" defaultValue={name} required minLength={2} maxLength={80} autoComplete="name" />
    </label>
    <button className="inline-flex min-h-[45px] justify-self-start items-center justify-center rounded-[3px] bg-green px-4 text-[0.87rem] font-extrabold text-white transition hover:bg-green-deep disabled:cursor-wait disabled:opacity-65" type="submit" disabled={saving}>{saving ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
    </button>
</form>;
}