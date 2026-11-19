import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MEESALA DEVADAS — Creative Video Editor & Cinematographer",
  description:
    "Official 3D creative portfolio of Meesala Devadas, Video Editor, Cinematographer, and Visual Storyteller. Specializing in DaVinci Resolve color grading, commercial films, music videos, and cinematic narratives.",
  keywords: [
    "Meesala Devadas",
    "Devadas Video Editor",
    "Video Editor Hyderabad",
    "Cinematographer Hyderabad",
    "Restart Academy",
    "DaVinci Resolve",
    "Adobe Premiere Pro",
    "CapCut Video Editor",
    "Nidadavole",
    "editor_of_nidadavole"
  ],
  authors: [{ name: "Meesala Devadas" }],
  openGraph: {
    title: "MEESALA DEVADAS — Creative Video Editor & Cinematographer",
    description: "Every Frame Has a Story. I Bring It to Life.",
    url: "https://devadas-portfolio.vercel.app",
    siteName: "Devadas Studio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} scroll-smooth font-sans`}>
      <body className="bg-[#050507] text-[#F5F5F5] font-sans antialiased selection:bg-[#FF0000] selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
