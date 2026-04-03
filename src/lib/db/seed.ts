import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { hashSync } from "bcryptjs";
import * as schema from "./schema";

/* ─── Connect ─── */
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("❌  Missing DATABASE_URL in .env");
  process.exit(1);
}
const sql = neon(DATABASE_URL);
const db = drizzle(sql, { schema });

/* ─── Seed data ─── */
async function seed() {
  console.log("🌱  Seeding database…");

  /* 1 ── Admins ── */
  const adminRows = [
    { email: "admin@mymyatelier.com", name: "Mymy Admin", password: "Mymy@2026!" },
    { email: "khalil@mymyatelier.com", name: "Khalil", password: "Mymy@2026!" },
  ];
  for (const a of adminRows) {
    await db
      .insert(schema.admins)
      .values({ email: a.email, name: a.name, passwordHash: hashSync(a.password, 12) })
      .onConflictDoNothing();
  }
  console.log(`  ✔  ${adminRows.length} admins`);

  /* 2 ── Categories ── */
  const cats = [
    { name: "Rings", slug: "rings", description: "Signature bands and sculpted silhouettes crafted to become forever pieces.", image: "/images/cat-rings.jpg" },
    { name: "Necklaces", slug: "necklaces", description: "Layered pendants and statement chokers designed to frame every occasion.", image: "/images/cat-necklace.jpg" },
    { name: "Earrings", slug: "earrings", description: "Refined drops and luminous studs balancing softness with brilliance.", image: "/images/cat-earrings.jpg" },
    { name: "Bracelets", slug: "bracelets", description: "Modern cuffs and diamond bracelets finished with heirloom-level detail.", image: "/images/hero-bracelet.jpg" },
  ];
  for (const c of cats) {
    await db.insert(schema.categories).values(c).onConflictDoNothing();
  }
  console.log(`  ✔  ${cats.length} categories`);

  /* 3 ── Fetch inserted category IDs ── */
  const allCats = await db.select().from(schema.categories);
  const catIdMap: Record<string, number> = {};
  for (const c of allCats) catIdMap[c.name] = c.id;

  /* 4 ── Products ── */
  const productsData = [
    { name: "Aurelia Band", subtitle: "Sterling Silver 925", price: 1250, image: "/images/cat-rings.jpg", gallery: ["/images/cat-rings.jpg", "/images/hero-ring.jpg", "/images/best1.jpg", "/images/best6.jpg"], category: "Rings", materials: ["Sterling Silver 925", "VS Diamonds"], badge: "Bestseller", description: "A sculptural band in sterling silver with a satin finish, designed to complement every hand. Pavé-set VS diamonds trace the band's inner curve, catching light with the subtlest movement.", story: "Inspired by ancient traditions of silver craftsmanship, the Aurelia Band distills millennia of artisan knowledge into a single, enduring form. Each band is hand-polished in our atelier, its curves refined by our master silversmiths using techniques passed down through generations.", specs: [{ label: "Material", value: "925 Sterling Silver" }, { label: "Stone", value: "VS Diamond Pavé" }, { label: "Dimensions", value: "2.5mm width" }, { label: "Weight", value: "4g per ring" }], variants: ["Silver", "Rose Silver", "Oxidized Silver"], ratingScore: 4.8, ratingCount: 34 },
    { name: "Lunar Pendant", subtitle: "Sterling Silver", price: 890, image: "/images/best2.jpg", gallery: ["/images/best2.jpg", "/images/cat-necklace.jpg", "/images/best5.jpg", "/images/best8.jpg"], category: "Necklaces", materials: ["Sterling Silver"], badge: "New Arrival", description: "A crescent-shaped pendant in sterling silver, suspended from a delicate 45cm chain. The Lunar Pendant captures the quiet power of the night sky in a wearable, ever-relevant form.", story: "Drawn from the liminal space between day and night, the Lunar Pendant celebrates perpetual change. The curved silhouette is hand-cast and finished with a mirror polish that reflects its wearer's light back to the world.", specs: [{ label: "Material", value: "925 Sterling Silver" }, { label: "Stone", value: "None" }, { label: "Dimensions", value: "32mm pendant, 45cm chain" }, { label: "Weight", value: "5g" }], variants: ["Silver", "Matte Silver", "Rhodium Plated"], ratingScore: 4.6, ratingCount: 22 },
    { name: "Eos Drop Earrings", subtitle: "Sterling Silver 925", price: 2100, image: "/images/cat-earrings.jpg", gallery: ["/images/cat-earrings.jpg", "/images/hero-model.jpg", "/images/best4.jpg", "/images/best3.jpg"], category: "Earrings", materials: ["Sterling Silver 925"], badge: "Limited Edition", description: "Handcrafted in recycled sterling silver, these drop earrings feature hand-selected baroque pearls that catch the light with every movement. A testament to artisanal precision and timeless elegance.", story: "Inspired by the fluid motion of light on the Adriatic Sea, the Eos Drop Earrings are designed to dance. Each pair features two unique baroque pearls chosen for their individual character and lustrous depth.", specs: [{ label: "Material", value: "Recycled Sterling Silver" }, { label: "Stone", value: "Natural Baroque Pearl" }, { label: "Dimensions", value: "45mm length" }, { label: "Weight", value: "8g per earring" }], variants: ["Silver", "Oxidized Silver", "Rose Silver"], ratingScore: 4.9, ratingCount: 12 },
    { name: "Starlight Bracelet", subtitle: "VS Diamonds", price: 4500, image: "/images/hero-bracelet.jpg", gallery: ["/images/hero-bracelet.jpg", "/images/hero-product.jpg", "/images/best7.jpg", "/images/special1.jpg"], category: "Bracelets", materials: ["VS Diamonds"], badge: "Signature", description: "A tennis bracelet featuring 38 VS-grade diamonds set in sterling silver, designed to move fluidly with the wrist. Brilliant, articulated, and built to last a lifetime.", story: "The Starlight Bracelet was born from a desire to capture the night sky at its clearest. Each diamond is individually hand-set and inspected by our master stone-setter to ensure perfectly matched brilliance across every link.", specs: [{ label: "Material", value: "Sterling Silver 925" }, { label: "Stone", value: "38× VS Diamond (F color)" }, { label: "Dimensions", value: "18cm length, 3mm width" }, { label: "Weight", value: "12g" }], variants: ["Silver", "Rhodium Plated", "Rose Silver"], ratingScore: 5.0, ratingCount: 8 },
    { name: "Terra Ring", subtitle: "Sterling Silver 925", price: 1400, image: "/images/best6.jpg", gallery: ["/images/best6.jpg", "/images/cat-rings.jpg", "/images/hero-ring.jpg", "/images/best1.jpg"], category: "Rings", materials: ["Sterling Silver 925"], badge: "", description: "A wide, architectural band in brushed sterling silver, drawing inspiration from the landscapes of the earth. Bold yet refined, the Terra Ring is a statement of quiet confidence.", story: "Forged from ethically sourced sterling silver, the Terra Ring takes its form from the contours of ancient landscapes. The brushed finish is applied by hand, each stroke contributing to a surface that is uniquely and irreproducibly yours.", specs: [{ label: "Material", value: "925 Sterling Silver" }, { label: "Stone", value: "None" }, { label: "Dimensions", value: "6mm width" }, { label: "Weight", value: "7g per ring" }], variants: ["Silver", "Brushed Silver", "Oxidized Silver"], ratingScore: 4.7, ratingCount: 19 },
    { name: "Veritas Choker", subtitle: "Emeralds & Silver", price: 3200, image: "/images/best5.jpg", gallery: ["/images/best5.jpg", "/images/cat-necklace.jpg", "/images/best2.jpg", "/images/special2.jpg"], category: "Necklaces", materials: ["Sterling Silver 925", "VS Diamonds"], badge: "Exclusive", description: "A bold choker in sterling silver with a VS diamond-set pendant, designed to rest at the base of the throat. Where strength meets softness — the Veritas Choker speaks for itself.", story: "Truth — veritas — is most powerful when stated plainly. The Veritas Choker channels this philosophy into jewelry: no excess, no ornamentation beyond what is essential. The diamond pendant whispers what words sometimes cannot.", specs: [{ label: "Material", value: "925 Sterling Silver" }, { label: "Stone", value: "VS Diamond, Natural Emerald" }, { label: "Dimensions", value: "38cm circumference" }, { label: "Weight", value: "14g" }], variants: ["Silver", "Silver & Emerald", "Silver & Ruby"], ratingScore: 4.8, ratingCount: 15 },
    { name: "Solene Hoops", subtitle: "Sterling Silver 925", price: 1750, image: "/images/best4.jpg", gallery: ["/images/best4.jpg", "/images/cat-earrings.jpg", "/images/hero-model.jpg", "/images/best3.jpg"], category: "Earrings", materials: ["Sterling Silver 925"], badge: "", description: "Oversized hoops in sterling silver with a hammered texture that diffuses light softly across their surface. The Solene Hoops are bold in scale yet effortless in wear.", story: "Named for the French word for sun, the Solene Hoops were designed to carry warmth wherever they go. The hammered texture is applied by hand using a traditional silversmith's technique, ensuring no two pairs are identical.", specs: [{ label: "Material", value: "925 Sterling Silver" }, { label: "Stone", value: "None" }, { label: "Dimensions", value: "55mm diameter" }, { label: "Weight", value: "10g per pair" }], variants: ["Silver", "Rose Silver", "Oxidized Silver"], ratingScore: 4.7, ratingCount: 28 },
    { name: "Celeste Strand", subtitle: "Sterling Silver", price: 980, image: "/images/best3.jpg", gallery: ["/images/best3.jpg", "/images/cat-necklace.jpg", "/images/best2.jpg", "/images/special3.jpg"], category: "Necklaces", materials: ["Sterling Silver"], badge: "", description: "A long, layered strand necklace in sterling silver with freshwater pearl stations. Versatile and luminous, the Celeste Strand can be worn long or doubled for a more dramatic effect.", story: "Inspired by the star-scattered skies that gave pearls their mystique throughout centuries of human culture, the Celeste Strand brings the celestial to the everyday. Each freshwater pearl is individually knotted by hand on sterling silver chain.", specs: [{ label: "Material", value: "925 Sterling Silver" }, { label: "Stone", value: "Freshwater Pearls (5–6mm)" }, { label: "Dimensions", value: "90cm length" }, { label: "Weight", value: "18g" }], variants: ["Silver", "Gold Plated", "Oxidized Silver"], ratingScore: 4.5, ratingCount: 31 },
    { name: "Orion Cuff", subtitle: "VS Diamonds", price: 5100, image: "/images/best7.jpg", gallery: ["/images/best7.jpg", "/images/hero-bracelet.jpg", "/images/hero-product.jpg", "/images/special4.jpg"], category: "Bracelets", materials: ["VS Diamonds", "Sterling Silver 925"], badge: "Limited Edition", description: "A rigid cuff in sterling silver set with a constellation of VS-grade diamonds arranged in the pattern of Orion's belt. Sculptural, architectural, and unmistakably Mymy.", story: "The Orion Cuff was born from a single sketch made on a winter night beneath an unusually clear sky. The three-diamond constellation at its center mirrors the three stars of Orion's belt — a reminder that beauty exists at every scale, from the cosmos to the curve of a wrist.", specs: [{ label: "Material", value: "925 Sterling Silver" }, { label: "Stone", value: "3× VS Diamond (E color, 0.5ct each)" }, { label: "Dimensions", value: "Inner Ø 60mm, width 14mm" }, { label: "Weight", value: "22g" }], variants: ["Silver", "Rhodium Plated", "Rose Silver"], ratingScore: 4.9, ratingCount: 6 },
  ];

  for (const p of productsData) {
    const catId = catIdMap[p.category];
    if (!catId) { console.warn(`  ⚠ Category "${p.category}" not found — skipping ${p.name}`); continue; }
    await db.insert(schema.products).values({
      name: p.name,
      subtitle: p.subtitle,
      price: p.price,
      image: p.image,
      gallery: p.gallery,
      categoryId: catId,
      materials: p.materials,
      badge: p.badge,
      description: p.description,
      story: p.story,
      specs: p.specs,
      variants: p.variants,
      ratingScore: p.ratingScore,
      ratingCount: p.ratingCount,
    });
  }
  console.log(`  ✔  ${productsData.length} products`);

  console.log("✅  Seed complete!");
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err);
  process.exit(1);
});
