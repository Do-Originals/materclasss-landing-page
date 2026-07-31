import Image from "next/image";
import Link from "next/link";
import { CheckoutButton } from "@/components/payment/CheckoutButton";
import { SiteContentType } from "@/content/copy";

export function Header({ content }: { content?: SiteContentType }) {
  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-surface-dark/40 backdrop-blur-md border-b border-white/10 py-4 transition-all">
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <Link href="/" className="inline-block relative h-12 w-48">
          <Image 
            src="/logo.jpg" 
            alt="DO Originals Logo"
            fill
            className="object-contain object-left"
            priority
            unoptimized={true}
          />
        </Link>
        <CheckoutButton 
          text={content ? (content.course.showPriceInCta ? `${content.hero.cta} - ₹${content.course.price}` : content.hero.cta) : "Book Your Seat"}
          course={content?.course}
          className="animate-cta-shake animate-cta-flash bg-brand-magenta hover:bg-brand-magenta/90 text-white px-5 py-2 rounded-full font-semibold text-sm transition-all shadow-[0_0_15px_rgba(230,0,122,0.3)] hover:shadow-[0_0_25px_rgba(230,0,122,0.5)] border-0 h-auto"
        />
      </div>
    </header>
  );
}
