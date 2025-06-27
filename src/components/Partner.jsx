import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function PartnerSection() {
    // Partner logo assets
    const partnerLogos = [
        "/assets/client1.png",
        "/assets/client2.png",
        "/assets/client3.png",
        "/assets/client4.png",
        "/assets/client5.png",
        "/assets/client6.png",
    ];

    return (
        <div className="container mx-auto mb-8 md:mb-12 px-4 md:px-30">
            {/* Section Header */}
            <div className="flex items-center justify-center">
                <div className="w-full">
                    <div className="md:mb-2 text-center">
                        <h4 className="text-sm md:text-base text-[#A52A2A] font-bold mb-1 md:mb-2">
                            Partners & Clients
                        </h4>
                        <h1 className="text-3xl md:text-4xl font-bold text-black">
                            We work with the best people
                        </h1>
                    </div>

                    {/* Partner Logo Marquee */}
                    <Marquee direction="right" speed={120} className="py-4">
                        <div className="flex items-center gap-8 md:gap-12">
                            {partnerLogos.map((logoSrc, index) => (
                                <Image
                                    key={index}
                                    src={logoSrc}
                                    alt={`Partner ${index + 1}`}
                                    width={150}
                                    height={150}
                                    className="w-25 h-25 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain"
                                />
                            ))}
                        </div>
                    </Marquee>
                </div>
            </div>
        </div>
    );
}
