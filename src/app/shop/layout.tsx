import Link from "next/link";

export default function ShopLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-warm-white text-text-dark">
      <header className="sticky top-0 z-50 border-b border-cream-dark/40 bg-warm-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link href="/" className="font-playfair text-[1.85rem] leading-none text-text-dark">
            Mymy
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            <Link href="/shop" className="border-b border-[#8b6914] pb-1 font-montserrat text-sm text-[#8b6914]">
              Shop
            </Link>
            <Link href="/#collections" className="font-montserrat text-sm text-text-dark transition-colors hover:text-[#8b6914]">
              Collections
            </Link>
            <Link href="/#our-story" className="font-montserrat text-sm text-text-dark transition-colors hover:text-[#8b6914]">
              Our Story
            </Link>
          </nav>

          <div className="hidden items-center gap-5 md:flex">
            <button aria-label="Search" className="text-[#8b6914] transition-colors hover:text-[#6f5110]">
              <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
            <button aria-label="Account" className="text-[#8b6914] transition-colors hover:text-[#6f5110]">
              <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z" />
              </svg>
            </button>
            <button aria-label="Wishlist" className="text-[#8b6914] transition-colors hover:text-[#6f5110]">
              <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
            </button>
            <button aria-label="Cart" className="text-[#8b6914] transition-colors hover:text-[#6f5110]">
              <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1l.4 2M7 13h7l3-8H5.4m1.6 8L5.4 5m1.6 8l-1.35 2.7A1 1 0 006.55 17h8.9a1 1 0 100-2H7.42l.93-2zM7 18a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-cream-dark/40 bg-[#f7f3ec]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:px-10">
          <div>
            <h3 className="font-playfair text-3xl text-text-dark">Mymy Atelier</h3>
            <p className="mt-4 max-w-xs font-montserrat text-sm leading-7 text-[#7a7065]">
              Crafting future heirlooms with ethical materials and ancestral techniques.
            </p>
          </div>

          <div>
            <p className="font-montserrat text-[0.66rem] uppercase tracking-[0.22em] text-[#a89c87]">Shop</p>
            <ul className="mt-4 space-y-3 font-montserrat text-sm text-[#6c6257]">
              <li><Link href="/shop">Shop</Link></li>
              <li><Link href="/#collections">Collections</Link></li>
              <li><Link href="/#our-story">Our Story</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-montserrat text-[0.66rem] uppercase tracking-[0.22em] text-[#a89c87]">Service</p>
            <ul className="mt-4 space-y-3 font-montserrat text-sm text-[#6c6257]">
              <li><Link href="#">Shipping</Link></li>
              <li><Link href="#">Returns</Link></li>
              <li><Link href="#">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-montserrat text-[0.66rem] uppercase tracking-[0.22em] text-[#a89c87]">Follow</p>
            <ul className="mt-4 space-y-3 font-montserrat text-sm text-[#6c6257]">
              <li><Link href="#">Instagram</Link></li>
              <li><Link href="#">Pinterest</Link></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-10">
          <p className="font-montserrat text-[0.62rem] uppercase tracking-[0.24em] text-[#b3a897]">
            © 2024 Mymy Atelier. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
