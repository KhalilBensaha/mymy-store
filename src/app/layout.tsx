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
import { cn } from "@/lib/utils";
import SplashCursor from "@/components/SplashCursor";

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
const OG_IMAGE = `${SITE_URL}/bg-image.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Mymy Atelier | مجوهرات فاخرة — ألماس · ذهب · لؤلؤ",
    template: "%s — Mymy Atelier | مجوهرات فاخرة",
  },

  description:
    "اكتشفي مجموعة Mymy Atelier من المجوهرات الفاخرة المصنوعة يدوياً — ألماس معتمد، ذهب خالص 18 قيراط، ولؤلؤ بحر الجنوب النادر. Luxury handcrafted jewelry: certified diamonds, 18K gold & South Sea pearls.",

  keywords: [
    // Arabic
    "مجوهرات فاخرة", "ألماس معتمد", "ذهب 18 قيراط", "لؤلؤ بحر الجنوب",
    "خواتم ألماس", "أساور ذهبية", "أقراط لؤلؤ", "عقود فاخرة",
    "مجوهرات عروس", "مجوهرات مصنوعة يدوياً", "Mymy Atelier",
    "مجوهرات الجزائر", "مجوهرات راقية", "هدايا مجوهرات",
    // English
    "luxury jewelry", "diamond rings", "18K gold jewelry", "pearl necklaces",
    "bridal jewelry", "handcrafted fine jewelry", "VS diamonds",
    "South Sea pearls", "Mymy Atelier", "certified diamonds",
    "gold bridal set", "solitaire rings", "diamond bracelet",
    // French
    "bijoux de luxe", "bagues en diamant", "or 18 carats", "perles de mer",
  ],

  alternates: {
    canonical: SITE_URL,
    languages: {
      ar: SITE_URL,
      en: SITE_URL,
      fr: SITE_URL,
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
    title: "Mymy Atelier | مجوهرات فاخرة — ألماس · ذهب · لؤلؤ",
    description:
      "اكتشفي مجوهراتنا الفاخرة المصنوعة يدوياً. Luxury handcrafted jewelry — certified diamonds, 18K gold & South Sea pearls.",
    url: SITE_URL,
    siteName: "Mymy Atelier",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Mymy Atelier — مجوهرات فاخرة | Luxury Fine Jewelry",
      },
    ],
    locale: "ar_DZ",
    alternateLocale: ["en_US", "fr_FR"],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Mymy Atelier | مجوهرات فاخرة",
    description:
      "اكتشفي مجموعة Mymy من الألماس المعتمد والذهب الخالص ولؤلؤ بحر الجنوب — مصنوعة يدوياً بعناية فائقة.",
    images: [OG_IMAGE],
    creator: "@mymyatelier",
  },

  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },

  category: "jewelry",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Mymy Atelier",
      alternateName: "Mymy مجوهرات",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: OG_IMAGE,
        width: 1200,
        height: 630,
      },
      description:
        "مجوهرات فاخرة مصنوعة يدوياً — ألماس معتمد، ذهب 18 قيراط، لؤلؤ بحر الجنوب. Handcrafted luxury jewelry: certified diamonds, 18K gold, South Sea pearls.",
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
      description: "مجوهرات فاخرة مصنوعة يدوياً",
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
      priceRange: "DA DA DA",
      currenciesAccepted: "DZD",
      paymentAccepted: "Credit Card, Bank Transfer, Cash on Delivery",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "مجوهرات فاخرة | Luxury Jewelry Collection",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Diamond Rings | خواتم الألماس" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Gold Necklaces | عقود ذهبية" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Pearl Earrings | أقراط لؤلؤ" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Diamond Bracelets | أساور ألماس" } },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="ar"
      dir="rtl"
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
        <I18nProvider><CartProvider>{children}</CartProvider></I18nProvider>
      </body>
    </html>
  );
}
