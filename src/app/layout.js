import { Suspense } from "react";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import ToastProvider from "@/components/toast-provider";
import { getCategories, getProducts } from "@/lib/catalog";
import SiteFooter from "@/components/site-footer";

export const metadata = {
  title: "বাজার দর | BazarDor",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default async function RootLayout({ children }) {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  return (
    <html lang="bn">
      <body className="flex min-h-screen flex-col bg-paper font-sans text-ink antialiased selection:bg-lime selection:text-green-deep">
        <Suspense fallback={<div className="h-[120px] border-b border-line bg-white" />}>
          <SiteHeader categories={categories} tickerItems={products} />
        </Suspense>
        {children}
        <SiteFooter />
        <ToastProvider />
      </body>
    </html>
  );
}
