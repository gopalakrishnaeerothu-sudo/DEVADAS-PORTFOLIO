import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meesala Devadas — Creative Video Editor & Cinematographer",
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
    title: "Meesala Devadas — Creative Video Editor & Cinematographer",
    description: "Every Frame Has a Story. I Bring It to Life.",
    url: "https://github.com/gopalakrishnaeerothu-sudo/DEVADAS-PORTFOLIO",
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
    <html lang="en" className={`${inter.variable} ${sora.variable} scroll-smooth`}>
      <body className="bg-[#08090D] text-[#F5F3EF] antialiased selection:bg-[#FF6B35] selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
