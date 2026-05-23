import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Calistoga, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});
const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Leotrim Haliti | Software Engineer",
  description:
    "Personal portfolio of Leotrim Haliti, a software engineer from Kosovo. Projects, blog posts, and contact.",
  keywords: [
    "Leotrim Haliti",
    "leotrimhaliti",
    "leotrim.info",
    "leotrimhaliti.me",
    "leotrimhaliti.com",
    "Leotrim",
    "Haliti",
    "software engineer Kosovo",
    "full stack developer Kosovo",
    "Next.js developer",
    "React developer",
  ],
  authors: [{ name: "Leotrim Haliti", url: "https://leotrim.info" }],
  creator: "Leotrim Haliti",
  metadataBase: new URL("https://leotrim.info"),
  alternates: {
    canonical: "https://leotrim.info",
  },
  openGraph: {
    type: "website",
    url: "https://leotrim.info",
    title: "Leotrim Haliti | Software Engineer",
    description:
      "Personal portfolio of Leotrim Haliti, a software engineer from Kosovo. Projects, blog posts, and contact.",
    siteName: "Leotrim Haliti",
    images: [{ url: "/newavatar.png", width: 1200, height: 630, alt: "Leotrim Haliti" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leotrim Haliti | Software Engineer",
    description:
      "Personal portfolio of Leotrim Haliti, a software engineer from Kosovo.",
    images: ["/newavatar.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: "Dk8Y1xIrHiJS-Ta4p4sEpPukAboz1iLRlIf8JJRm2cI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          calistoga.variable,
        )}
      >
        <Providers>
          <Header />
          <div className="mx-auto flex max-w-3xl flex-col px-8">
            <main className="grow">{children}</main>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
