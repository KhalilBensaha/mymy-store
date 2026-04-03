import { getContactSettings, getSocialLinks } from "@/lib/actions/settings";
import ContactClient from "./contact-client";

export const revalidate = 0;

export default async function ContactPage() {
  const [contactInfo, socialLinks] = await Promise.all([
    getContactSettings(),
    getSocialLinks(),
  ]);
  return <ContactClient contactInfo={contactInfo} socialLinks={socialLinks} />;
}
