import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://devadas-portfolio.vercel.app"),
  title: "Meesala Devadas | Video Editor, Cinematographer & Visual Storyteller",
  description:
    "Official portfolio of Meesala Devadas: video editor, cinematographer and colorist from Hyderabad / Nidadavole. Commercials, music videos, short films, wedding films and cinematography reels.",
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
    "editor_of_nidadavole",
  ],
  authors: [{ name: "Meesala Devadas" }],
  openGraph: {
    title: "Meesala Devadas | Video Editor & Cinematographer",
    description: "Every frame has a story. I bring it to life.",
    url: "https://devadas-portfolio.vercel.app",
    siteName: "Devadas Portfolio",
    locale: "en_US",
    type: "website",
    images: ["/images/profile/devadas-poster.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Same boot script as the RamaRaju site: restore the saved theme and hold the
// hero in its entrance start state until hero.js plays the intro timeline.
const BOOT = `(function(){var t='dark';try{t=localStorage.getItem('md-theme')||'dark';}catch(e){}document.documentElement.setAttribute('data-theme',t);})();
document.documentElement.classList.add('intro');
setTimeout(function(){document.documentElement.classList.remove('intro');},4000);`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;1,600&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
