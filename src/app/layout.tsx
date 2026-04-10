import type { Metadata } from "next";
import {
  Playfair_Display,
  Cormorant_Garamond,
  Montserrat,
  Nunito,
  Geist,
  Cairo,
} from "next/font/google";
import "./globals.css";
import { I18nProvider } from "./i18n/provider";
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import { cn } from "@/lib/utils";
import SplashCursor from "@/components/SplashCursor";
import { getSiteLanguage, getSocialLinks } from "@/lib/actions/settings";
import { SiteFooter } from "./components/site-footer";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["800", "900"],
  display: "swap",
});

const SITE_URL = "https://mymy-store.vercel.app";
const OG_IMAGE = `${SITE_URL}/bg-image.jpg?v=20260410`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Mymy Atelier | Natural Healing Stones | أحجار علاجية طبيعية",
    template: "%s — Mymy Atelier | Natural Healing Stones",
  },
  verification: {
    google: 'P-tYjvIyiSurgo0Q116DJGHbXRklF76b--AURmJgAV8', 
  },

  description:
    "Discover Mymy Atelier natural healing stones — authentic crystals selected for balance, calm, and positive energy. اكتشفي أحجار ميمي العلاجية الطبيعية المختارة بعناية.",

  keywords: [
    // Arabic
    "أحجار علاجية طبيعية", "كريستال طبيعي", "أحجار طاقة", "أحجار توازن",
    "أحجار عافية", "أحجار أصلية", "Mymy Atelier", "أحجار الجزائر",
    // English
    "natural healing stones", "healing crystals", "authentic stones", "wellness stones",
    "chakra stones", "energy crystals", "mymy atelier", "stone shop algeria",
    // French
    "pierres naturelles thérapeutiques", "cristaux de guérison", "pierres bien-être", "pierres énergétiques",
  ],

  alternates: {
    canonical: SITE_URL,
    languages: {
      ar: `${SITE_URL}`,
      en: `${SITE_URL}`,
      fr: `${SITE_URL}`,
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Mymy Atelier | Natural Healing Stones | أحجار علاجية طبيعية",
    description:
      "Natural healing stones selected for balance and positive energy. أحجار علاجية طبيعية مختارة للتوازن والطاقة الإيجابية.",
    url: SITE_URL,
    siteName: "Mymy Atelier",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Mymy Atelier — Natural Healing Stones | أحجار علاجية طبيعية",
      },
    ],
    locale: "ar_DZ",
    alternateLocale: ["en_US", "fr_FR"],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Mymy Atelier | Natural Healing Stones",
    description:
      "Explore authentic natural healing stones for calm, focus, and daily balance.",
    images: [OG_IMAGE],
    creator: "@mymyatelier",
  },

  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },

  category: "wellness",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Mymy Atelier",
      alternateName: "Mymy Natural Healing Stones",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: OG_IMAGE,
        width: 1200,
        height: 630,
      },
      description:
        "Natural healing stones selected with care for balance, intention, and positive energy. أحجار علاجية طبيعية أصلية.",
      sameAs: [
        "https://www.instagram.com/mymyatelier",
        "https://www.pinterest.com/mymyatelier",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Mymy Atelier",
      description: "Natural healing stones boutique",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: ["ar", "en", "fr"],
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/shop?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Store",
      "@id": `${SITE_URL}/#store`,
      name: "Mymy Atelier",
      image: OG_IMAGE,
      url: SITE_URL,
      priceRange: "$$",
      currenciesAccepted: "DZD",
      paymentAccepted: "Credit Card, Bank Transfer, Cash on Delivery",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Natural Healing Stones Collection",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Amethyst Cluster" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Rose Quartz Stone" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Black Tourmaline" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Clear Quartz" } },
        ],
      },
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const defaultLocale = await getSiteLanguage();
  const socialLinks = await getSocialLinks();
  return (
    <html
      suppressHydrationWarning
      lang={defaultLocale}
      dir={defaultLocale === "ar" ? "rtl" : "ltr"}
      className={cn(
        "h-full", "antialiased",
        playfair.variable, cormorant.variable, montserrat.variable,
        nunito.variable, cairo.variable, "font-sans", geist.variable,
      )}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
        <I18nProvider defaultLocale={defaultLocale}>
          <CartProvider>
            <WishlistProvider>
              {children}
              <SiteFooter socialLinks={socialLinks} />
            </WishlistProvider>
          </CartProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
