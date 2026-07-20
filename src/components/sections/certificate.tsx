import { siteContent } from "@/content/copy";
import Image from "next/image";

export function Certificate() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-surface-dark font-heading mb-4">
            {siteContent.certificate.heading}
          </h2>
          <p className="text-lg text-surface-dark/80">
            {siteContent.certificate.description}
          </p>
        </div>

        <div className="bg-bg rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm max-w-3xl mx-auto">
          <div className="relative aspect-[4/3] md:aspect-[3/2] w-full rounded-xl overflow-hidden border border-gray-200 shadow-inner">
            <Image 
              src={siteContent.certificate.image} 
              alt="Course Certificate Mockup"
              fill
              className="object-cover"
            />
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Issued By</p>
            <p className="text-xl font-bold text-surface-dark mt-1">{siteContent.certificate.issuer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
