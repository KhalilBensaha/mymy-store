import { notFound } from "next/navigation";
import { getOrderByNumber } from "@/lib/actions/orders";
import { ConfirmationClient } from "./confirmation-client";

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;
  const order = await getOrderByNumber(orderNumber);

  if (!order) notFound();

  return <ConfirmationClient order={order} />;
}
