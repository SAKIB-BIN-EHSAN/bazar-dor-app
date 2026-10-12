import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export const metadata = {
  title: "বাজার দর | BazarDor",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default async function RootLayout({ children }) {

  return (
    <html lang="bn">
      <body className="flex min-h-screen flex-col bg-paper font-sans text-ink antialiased selection:bg-lime selection:text-green-deep">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
