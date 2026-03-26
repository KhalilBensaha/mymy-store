import { getMessages } from "@/lib/actions/messages";
import MessagesClient from "./messages-client";

export const revalidate = 0;

export default async function MessagesPage() {
  const messages = await getMessages();

  return <MessagesClient initialMessages={messages} />;
}
