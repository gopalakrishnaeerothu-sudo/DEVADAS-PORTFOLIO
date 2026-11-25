import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://devadas-portfolio.vercel.app"),
  title: "Meesala Devadas | Aspiring Actor",
  description:
    "Portfolio of Meesala Devadas, an aspiring actor from Hyderabad / Nidadavole. Character looks, lookbook and casting contact for films, web series, music videos and ads.",
  keywords: [
    "Meesala Devadas",
    "Devadas Actor",
    "Actor Hyderabad",
    "Telugu Actor",
    "Actor Portfolio",
    "Nidadavole",
  ],
  authors: [{ name: "Meesala Devadas" }],
  openGraph: {
    title: "Meesala Devadas | Aspiring Actor",
    description: "Every character has a story. I'm ready to bring it to life.",
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
