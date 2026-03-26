import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Montserrat, Nunito, Geist } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "./i18n/provider";
import { cn } from "@/lib/utils";
import SplashCursor from "@/components/SplashCursor";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["800", "900"],
});

export const metadata: Metadata = {
  title: "Mymy — Luxury Jewelry",
  description: "Crafted for Eternity. Designed for Elegance.",
  keywords: [
    "luxury jewelry",
    "diamond necklaces",
    "gold bridal sets",
    "pearl earrings",
    "handcrafted jewelry",
    "certified diamonds",
    "pure 22K gold",
    "dz",
    "mymy",
    
    "premium South Sea pearls",
  ],
  openGraph: {
    title: "Mymy — Luxury Jewelry",
    description: "Crafted for Eternity. Designed for Elegance.",
    url: "https://mymy-store.vercel.app",
    siteName: "Mymy Store",
    images: [
      {
        url: "https://mymy-store.vercel.app/bg-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mymy Store - Luxury Jewelry",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mymy — Luxury Jewelry",
    description: "Crafted for Eternity. Designed for Elegance.",
    images: ["https://mymy-store.vercel.app/bg-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cn("h-full", "antialiased", playfair.variable, cormorant.variable, montserrat.variable, nunito.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <SplashCursor
          SPLAT_RADIUS={0.07}
          SPLAT_FORCE={5000}
          DENSITY_DISSIPATION={3}
          VELOCITY_DISSIPATION={2}
          COLOR_UPDATE_SPEED={6}
          CURL={4}
          BACK_COLOR={{ r: 0, g: 0, b: 0 }}
          TRANSPARENT={true}
        />
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
