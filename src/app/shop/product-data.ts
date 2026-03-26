import type { Category } from "./category-utils";

export type Material = "18K Yellow Gold" | "Sterling Silver" | "VS Diamonds";

export type Spec = { label: string; value: string };

export type Product = {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  gallery: string[];
  category: Category;
  materials: Material[];
  badge?: string;
  description: string;
  story: string;
  specs: Spec[];
  variants: string[];
  rating: { score: number; count: number };
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Aurelia Band",
    subtitle: "18K Yellow Gold",
    price: 1250,
    image: "/images/cat-rings.jpg",
    gallery: [
      "/images/cat-rings.jpg",
      "/images/hero-ring.jpg",
      "/images/best1.jpg",
      "/images/best6.jpg",
    ],
    category: "Rings",
    materials: ["18K Yellow Gold", "VS Diamonds"],
    badge: "Bestseller",
    description:
      "A sculptural band in 18k yellow gold with a satin finish, designed to complement every hand. Pavé-set VS diamonds trace the band's inner curve, catching light with the subtlest movement.",
    story:
      "Inspired by ancient Roman traditions of gold craftsmanship, the Aurelia Band distills millennia of artisan knowledge into a single, enduring form. Each band is hand-polished in our atelier, its curves refined by our master goldsmiths using techniques passed down through generations.",
    specs: [
      { label: "Material", value: "18k Yellow Gold" },
      { label: "Stone", value: "VS Diamond Pavé" },
      { label: "Dimensions", value: "2.5mm width" },
      { label: "Weight", value: "4g per ring" },
    ],
    variants: ["Gold", "Rose Gold", "White Gold"],
    rating: { score: 4.8, count: 34 },
  },
  {
    id: 2,
    name: "Lunar Pendant",
    subtitle: "Sterling Silver",
    price: 890,
    image: "/images/best2.jpg",
    gallery: [
      "/images/best2.jpg",
      "/images/cat-necklace.jpg",
      "/images/best5.jpg",
      "/images/best8.jpg",
    ],
    category: "Necklaces",
    materials: ["Sterling Silver"],
    badge: "New Arrival",
    description:
      "A crescent-shaped pendant in sterling silver, suspended from a delicate 45cm chain. The Lunar Pendant captures the quiet power of the night sky in a wearable, ever-relevant form.",
    story:
      "Drawn from the liminal space between day and night, the Lunar Pendant celebrates perpetual change. The curved silhouette is hand-cast and finished with a mirror polish that reflects its wearer's light back to the world.",
    specs: [
      { label: "Material", value: "925 Sterling Silver" },
      { label: "Stone", value: "None" },
      { label: "Dimensions", value: "32mm pendant, 45cm chain" },
      { label: "Weight", value: "5g" },
    ],
    variants: ["Silver", "Gold Plated", "Rose Gold Plated"],
    rating: { score: 4.6, count: 22 },
  },
  {
    id: 3,
    name: "Eos Drop Earrings",
    subtitle: "18K Yellow Gold",
    price: 2100,
    image: "/images/cat-earrings.jpg",
    gallery: [
      "/images/cat-earrings.jpg",
      "/images/hero-model.jpg",
      "/images/best4.jpg",
      "/images/best3.jpg",
    ],
    category: "Earrings",
    materials: ["18K Yellow Gold"],
    badge: "Limited Edition",
    description:
      "Handcrafted in 18k recycled gold, these drop earrings feature hand-selected baroque pearls that catch the light with every movement. A testament to artisanal precision and timeless elegance.",
    story:
      "Inspired by the fluid motion of light on the Adriatic Sea, the Eos Drop Earrings are designed to dance. Each pair features two unique baroque pearls chosen for their individual character and lustrous depth. No two pieces are identical, celebrating the raw, organic beauty of nature refined through artisan gold-smithing techniques.",
    specs: [
      { label: "Material", value: "18k Recycled Yellow Gold" },
      { label: "Stone", value: "Natural Baroque Pearl" },
      { label: "Dimensions", value: "45mm length" },
      { label: "Weight", value: "8g per earring" },
    ],
    variants: ["Gold", "Silver", "Rose Gold"],
    rating: { score: 4.9, count: 12 },
  },
  {
    id: 4,
    name: "Starlight Bracelet",
    subtitle: "VS Diamonds",
    price: 4500,
    image: "/images/hero-bracelet.jpg",
    gallery: [
      "/images/hero-bracelet.jpg",
      "/images/hero-product.jpg",
      "/images/best7.jpg",
      "/images/special1.jpg",
    ],
    category: "Bracelets",
    materials: ["VS Diamonds"],
    badge: "Signature",
    description:
      "A tennis bracelet featuring 38 VS-grade diamonds set in 18k white gold, designed to move fluidly with the wrist. Brilliant, articulated, and built to last a lifetime.",
    story:
      "The Starlight Bracelet was born from a desire to capture the night sky at its clearest. Each diamond is individually hand-set and inspected by our master stone-setter to ensure perfectly matched brilliance across every link.",
    specs: [
      { label: "Material", value: "18k White Gold" },
      { label: "Stone", value: "38× VS Diamond (F color)" },
      { label: "Dimensions", value: "18cm length, 3mm width" },
      { label: "Weight", value: "12g" },
    ],
    variants: ["White Gold", "Yellow Gold", "Rose Gold"],
    rating: { score: 5.0, count: 8 },
  },
  {
    id: 5,
    name: "Terra Ring",
    subtitle: "18K Yellow Gold",
    price: 1400,
    image: "/images/best6.jpg",
    gallery: [
      "/images/best6.jpg",
      "/images/cat-rings.jpg",
      "/images/hero-ring.jpg",
      "/images/best1.jpg",
    ],
    category: "Rings",
    materials: ["18K Yellow Gold"],
    description:
      "A wide, architectural band in brushed 18k yellow gold, drawing inspiration from the landscapes of the earth. Bold yet refined, the Terra Ring is a statement of quiet confidence.",
    story:
      "Forged from ethically sourced 18k yellow gold, the Terra Ring takes its form from the contours of ancient landscapes. The brushed finish is applied by hand, each stroke contributing to a surface that is uniquely and irreproducibly yours.",
    specs: [
      { label: "Material", value: "18k Yellow Gold" },
      { label: "Stone", value: "None" },
      { label: "Dimensions", value: "6mm width" },
      { label: "Weight", value: "7g per ring" },
    ],
    variants: ["Gold", "Brushed Gold", "White Gold"],
    rating: { score: 4.7, count: 19 },
  },
  {
    id: 6,
    name: "Veritas Choker",
    subtitle: "Emeralds & Gold",
    price: 3200,
    image: "/images/best5.jpg",
    gallery: [
      "/images/best5.jpg",
      "/images/cat-necklace.jpg",
      "/images/best2.jpg",
      "/images/special2.jpg",
    ],
    category: "Necklaces",
    materials: ["18K Yellow Gold", "VS Diamonds"],
    badge: "Exclusive",
    description:
      "A bold choker in 18k yellow gold with a VS diamond-set pendant, designed to rest at the base of the throat. Where strength meets softness — the Veritas Choker speaks for itself.",
    story:
      "Truth — veritas — is most powerful when stated plainly. The Veritas Choker channels this philosophy into jewelry: no excess, no ornamentation beyond what is essential. The diamond pendant whispers what words sometimes cannot.",
    specs: [
      { label: "Material", value: "18k Yellow Gold" },
      { label: "Stone", value: "VS Diamond, Natural Emerald" },
      { label: "Dimensions", value: "38cm circumference" },
      { label: "Weight", value: "14g" },
    ],
    variants: ["Gold", "Gold & Emerald", "Gold & Ruby"],
    rating: { score: 4.8, count: 15 },
  },
  {
    id: 7,
    name: "Solene Hoops",
    subtitle: "18K Yellow Gold",
    price: 1750,
    image: "/images/best4.jpg",
    gallery: [
      "/images/best4.jpg",
      "/images/cat-earrings.jpg",
      "/images/hero-model.jpg",
      "/images/best3.jpg",
    ],
    category: "Earrings",
    materials: ["18K Yellow Gold"],
    description:
      "Oversized hoops in 18k yellow gold with a hammered texture that diffuses light softly across their surface. The Solene Hoops are bold in scale yet effortless in wear.",
    story:
      "Named for the French word for sun, the Solene Hoops were designed to carry warmth wherever they go. The hammered texture is applied by hand using a traditional goldsmith's technique, ensuring no two pairs are identical.",
    specs: [
      { label: "Material", value: "18k Yellow Gold" },
      { label: "Stone", value: "None" },
      { label: "Dimensions", value: "55mm diameter" },
      { label: "Weight", value: "10g per pair" },
    ],
    variants: ["Gold", "Rose Gold", "Silver"],
    rating: { score: 4.7, count: 28 },
  },
  {
    id: 8,
    name: "Celeste Strand",
    subtitle: "Sterling Silver",
    price: 980,
    image: "/images/best3.jpg",
    gallery: [
      "/images/best3.jpg",
      "/images/cat-necklace.jpg",
      "/images/best2.jpg",
      "/images/special3.jpg",
    ],
    category: "Necklaces",
    materials: ["Sterling Silver"],
    description:
      "A long, layered strand necklace in sterling silver with freshwater pearl stations. Versatile and luminous, the Celeste Strand can be worn long or doubled for a more dramatic effect.",
    story:
      "Inspired by the star-scattered skies that gave pearls their mystique throughout centuries of human culture, the Celeste Strand brings the celestial to the everyday. Each freshwater pearl is individually knotted by hand on sterling silver chain.",
    specs: [
      { label: "Material", value: "925 Sterling Silver" },
      { label: "Stone", value: "Freshwater Pearls (5–6mm)" },
      { label: "Dimensions", value: "90cm length" },
      { label: "Weight", value: "18g" },
    ],
    variants: ["Silver", "Gold Plated", "Oxidized Silver"],
    rating: { score: 4.5, count: 31 },
  },
  {
    id: 9,
    name: "Orion Cuff",
    subtitle: "VS Diamonds",
    price: 5100,
    image: "/images/best7.jpg",
    gallery: [
      "/images/best7.jpg",
      "/images/hero-bracelet.jpg",
      "/images/hero-product.jpg",
      "/images/special4.jpg",
    ],
    category: "Bracelets",
    materials: ["VS Diamonds", "18K Yellow Gold"],
    badge: "Limited Edition",
    description:
      "A rigid cuff in 18k yellow gold set with a constellation of VS-grade diamonds arranged in the pattern of Orion's belt. Sculptural, architectural, and unmistakably Mymy.",
    story:
      "The Orion Cuff was born from a single sketch made on a winter night beneath an unusually clear sky. The three-diamond constellation at its center mirrors the three stars of Orion's belt — a reminder that beauty exists at every scale, from the cosmos to the curve of a wrist.",
    specs: [
      { label: "Material", value: "18k Yellow Gold" },
      { label: "Stone", value: "3× VS Diamond (E color, 0.5ct each)" },
      { label: "Dimensions", value: "Inner Ø 60mm, width 14mm" },
      { label: "Weight", value: "22g" },
    ],
    variants: ["Yellow Gold", "White Gold", "Rose Gold"],
    rating: { score: 4.9, count: 6 },
  },
];
