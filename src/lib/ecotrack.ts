const BASE_URL = "https://golivri.ecotrack.dz";

function getToken() {
  const token = process.env.ECOTRACK_API_TOKEN;
  if (!token) throw new Error("ECOTRACK_API_TOKEN is not set");
  return token;
}

async function ecoFetch(path: string, params?: Record<string, string>, method: "GET" | "POST" = "GET") {
  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== "") url.searchParams.set(k, v);
    }
  }
  const res = await fetch(url.toString(), {
    method,
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`EcoTrack ${res.status}: ${text}`);
  }
  return res.json();
}

/* ─── Types ─── */

export type EcoWilaya = { wilaya_id: number; wilaya_name: string };
export type EcoCommune = { nom: string; wilaya_id: number; code_postal: string; has_stop_desk: number };
export type EcoFee = { wilaya_id: number; tarif: string; tarif_stopdesk: string };

export type EcoCreateOrderParams = {
  reference: string;
  nom_client: string;
  telephone: string;
  telephone_2?: string;
  adresse: string;
  commune: string;
  code_wilaya: string;
  montant: string;
  remarque?: string;
  produit: string;
  quantite: string;
  type?: string;
  stop_desk?: string;
  weight?: string;
  fragile?: string;
};

export type EcoOrderUpdate = {
  remarque: string;
  station: string;
  livreur: string;
  created_at: string;
  tracking: string;
};

/* ─── API Functions ─── */

export async function validateToken(): Promise<boolean> {
  try {
    const data = await ecoFetch("/api/v1/validate/token", {
      api_token: getToken(),
    });
    return !!data;
  } catch {
    return false;
  }
}

export async function getWilayas(): Promise<EcoWilaya[]> {
  const data = await ecoFetch("/api/v1/get/wilayas");
  return data.data ?? data;
}

export async function getCommunes(wilayaId: string): Promise<EcoCommune[]> {
  const data = await ecoFetch("/api/v1/get/communes", {
    wilaya_id: wilayaId,
  });
  // API may return an array or an object keyed by index
  const raw = data.data ?? data;
  if (Array.isArray(raw)) return raw;
  return Object.values(raw) as EcoCommune[];
}

export async function createDeliveryOrder(
  params: EcoCreateOrderParams
): Promise<string> {
  // Dry-run mode: log the request but don't actually create an order on EcoTrack
  if (process.env.ECOTRACK_DRY_RUN === "true") {
    console.log("[EcoTrack DRY RUN] Would create order:", params);
    return `DRY-RUN-${Date.now()}`;
  }

  const data = await ecoFetch(
    "/api/v1/create/order",
    params as Record<string, string>
  );
  // Return tracking code from the response
  return data.tracking ?? data.data?.tracking ?? "";
}

export async function getOrderUpdates(
  tracking: string
): Promise<EcoOrderUpdate[]> {
  const data = await ecoFetch("/api/v1/get/maj", { tracking });
  const raw = data.data ?? data ?? [];
  if (Array.isArray(raw)) return raw;
  return Object.values(raw) as EcoOrderUpdate[];
}

export async function getFees(): Promise<EcoFee[]> {
  const data = await ecoFetch("/api/v1/get/fees");
  return data.livraison ?? data.data?.livraison ?? [];
}

export async function addOrderUpdate(
  tracking: string,
  content: string
): Promise<boolean> {
  const data = await ecoFetch(
    "/api/v1/add/maj",
    { tracking, content },
    "POST"
  );
  return data.success === true;
}

export async function requestReturn(
  tracking: string
): Promise<{ success: boolean; message: string }> {
  const data = await ecoFetch(
    "/api/v1/ask/for/order/return",
    { tracking },
    "POST"
  );
  return { success: data.success ?? false, message: data.message ?? "" };
}
