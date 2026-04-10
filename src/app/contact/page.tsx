import type { Metadata } from "next";
import { getContactSettings, getSocialLinks } from "@/lib/actions/settings";
import ContactClient from "./contact-client";

const SITE_URL = "https://mymy-store.com";

export const metadata: Metadata = {
  title: "Contact Us — Mymy Atelier",
  description:
    "Get in touch with Mymy Atelier for questions about natural healing stones, orders, and delivery.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact Us — Mymy Atelier",
    description: "Questions about natural healing stones? Contact Mymy Atelier.",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
};

export const revalidate = 1800;

export default async function ContactPage() {
  const [contactInfo, socialLinks] = await Promise.all([
    getContactSettings(),
    getSocialLinks(),
  ]);
  return <ContactClient contactInfo={contactInfo} socialLinks={socialLinks} />;
}
