import type { Metadata } from "next";
import { getContactSettings, getSocialLinks } from "@/lib/actions/settings";
import ContactClient from "./contact-client";

const SITE_URL = "https://mymy-store.vercel.app";

export const metadata: Metadata = {
  title: "Contact Us — Mymy Atelier",
  description:
    "Get in touch with Mymy Atelier — bespoke commissions, questions about our collections, or just say hello.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact Us — Mymy Atelier",
    description: "Get in touch with Mymy Atelier.",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
};

export const revalidate = 0;

export default async function ContactPage() {
  const [contactInfo, socialLinks] = await Promise.all([
    getContactSettings(),
    getSocialLinks(),
  ]);
  return <ContactClient contactInfo={contactInfo} socialLinks={socialLinks} />;
}
