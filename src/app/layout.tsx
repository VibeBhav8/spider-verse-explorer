import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GlitchCanvas from "@/components/canvas/GlitchCanvas";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Spider-Verse Explorer | Multiverse Archive",
  description:
    "Explore Spider-People across the dimensions of the Spider-Verse with interactive web connections, audio themes, and 3D visualizers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#06070c] text-slate-100 antialiased selection:bg-[#ff0055] selection:text-white`}
      >
        <GlitchCanvas />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
