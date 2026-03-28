import { getContactSettings } from "@/lib/actions/settings";
import ContactClient from "./contact-client";

export const revalidate = 0;

export default async function ContactPage() {
  const contactInfo = await getContactSettings();
  return <ContactClient contactInfo={contactInfo} />;
}
