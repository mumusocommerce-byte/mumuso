import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"

const bentoItems = [
    {
        id: "modern-living",
        title: "Modern Living",
        desc: "Upgrade your space with our latest arrivals in home decor and lifestyle essentials.",
        linkText: "Shop Collection",
        href: "/catalog",
        image: "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/HOME-_-LIVING_044c6b86-1ee4-414b-9329-1f07223d440a.jpg?v=1775127018",
        titleSize: "text-3xl",
    },
    {
        id: "kids",
        title: "Kids",
        desc: "",
        linkText: "Shop Now",
        href: "/catalog?q=kids",
        image: "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/Kids-D1.jpg?v=1735803576",
        titleSize: "text-xl",
    },
    {
        id: "everyday-carry",
        title: "Everyday Carry",
        desc: "",
        linkText: "Shop Accessories",
        href: "/catalog",
        image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80",
        titleSize: "text-xl",
    }
]

function BentoCard({ item, className }: { item: typeof bentoItems[0], className?: string }) {
    return (
        <div className={`group relative rounded-2xl overflow-hidden bg-muted ${className || ""}`}>
            <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <h3 className={`${item.titleSize} font-bold text-white mb-2`}>{item.title}</h3>
                {item.desc && (
                    <p className="text-white/90 mb-4 max-w-md text-sm md:text-base">
                        {item.desc}
                    </p>
                )}
                <Link href={item.href} className="inline-flex items-center text-white/90 font-medium hover:text-white hover:underline underline-offset-4 w-fit text-sm md:text-base">
                    {item.linkText} <ArrowUpRight className="ml-1 h-3.5 w-3.5 md:h-4 md:w-4" />
                </Link>
            </div>
        </div>
    )
}

export function BentoGrid() {
    return (
        <section className="py-12 md:py-16">
            <div className="container mx-auto px-6 md:px-8">

                {/* Mobile View: Carousel */}
                <div className="block md:hidden">
                    <Carousel
                        opts={{ align: "start", loop: true }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {bentoItems.map((item) => (
                                <CarouselItem key={item.id} className="pl-4 basis-[85%] sm:basis-[60%] h-[350px]">
                                    <BentoCard item={item} className="w-full h-full" />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>

                {/* Desktop View: Grid */}
                <div className="hidden md:grid grid-cols-3 gap-6 auto-rows-[400px]">
                    {/* Large Featured Item (Spans 2 columns) */}
                    <BentoCard item={bentoItems[0]} className="col-span-2" />

                    {/* Stacked Small Items */}
                    <div className="grid grid-rows-2 gap-6">
                        <BentoCard item={bentoItems[1]} />
                        <BentoCard item={bentoItems[2]} />
                    </div>
                </div>

            </div>
        </section>
    )
}
