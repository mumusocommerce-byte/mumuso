"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel"

const categories = [
    { name: "Beauty & Skin Care", handle: "beauty-clean", image: "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/BEAUTY_SKINCARE.jpg?v=1773312467" },
    { name: "Beauty Masks", handle: "facial-mask", image: "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/BEAUTY-MASKS.jpg?v=1773312467" },
    { name: "Makeup & Perfume", handle: "make-up-tools", image: "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/MAKEUP-_-PERFUME.jpg?v=1773312467" },
    { name: "Hair & Nail Care", handle: "hair-care-women", image: "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/HAIR-_-NAIL-CARE.jpg?v=1773312467" },
    { name: "Toys", handle: "toys", image: "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/TOYS_7aac0ad2-c1ca-42d1-a2ea-3d0d5dce589d.jpg?v=1773312467" },
    { name: "Dental Care", handle: "dental-care", image: "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/DENTAL-CARE.jpg?v=1773312467" },
    { name: "Kitchenware", handle: "kitchen-dining", image: "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/KITCHENWARE.jpg?v=1773312467" },
    { name: "Household Essentials", handle: "home-living", image: "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/HOUSEHOLD-ESSENTIALS.jpg?v=1773312467" },
    { name: "Pet Supplies", handle: "pet-essential", image: "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/PET-SUPPLIES.jpg?v=1773312467" },
    { name: "Purses & Bags", handle: "gift-package-bags", image: "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/PURSES-_-BAGS.jpg?v=1773312467" },
    { name: "Storage", handle: "storage", image: "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/STORAGE.jpg?v=1773312467" },
    { name: "Stationery", handle: "stationery", image: "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/STATIONERY_d2daf697-7683-4cfb-b4e1-d5652591754c.jpg?v=1773312468" },
    { name: "Electronics", handle: "electronics", image: "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/ELECTRONICS_2dab8a1c-2d5c-4fd5-bb68-6eb52820c9f2.jpg?v=1773312467" },
    { name: "Fragrances & Diffusers", handle: "scent-air-freshener", image: "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/FRAGRANCES-_-DIFFUSERS.jpg?v=1773312467" },
    { name: "Fashion & Apparel", handle: "apparel-women", image: "https://cdn.shopify.com/s/files/1/0511/6906/7163/files/FASHION-_-APPAREL.jpg?v=1773312467" },
]

export function CategoryGrid() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [progress, setProgress] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        const handleScroll = () => {
            setProgress(Math.max(0, Math.min(100, api.scrollProgress() * 100)))
        }

        api.on("scroll", handleScroll)
        api.on("reInit", handleScroll)
        handleScroll()
    }, [api])

    // Chunk into columns of 2 for a 2-row layout in the carousel
    const columns = []
    for (let i = 0; i < categories.length; i += 2) {
        columns.push(categories.slice(i, i + 2))
    }

    return (
        <section className="py-8 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl md:text-2xl font-bold mb-6 tracking-tight">Shop by categories</h2>

            <Carousel
                setApi={setApi}
                opts={{
                    align: "start",
                    dragFree: true,
                }}
                className="w-full relative"
            >
                <CarouselContent className="-ml-4">
                    {columns.map((col, colIndex) => (
                        <CarouselItem key={colIndex} className="pl-4 basis-[28%] sm:basis-1/5 md:basis-1/6 lg:basis-[12.5%]">
                            <div className="flex flex-col gap-6">
                                {col.map((category) => (
                                    <Link
                                        key={category.handle}
                                        href={`/catalog/${category.handle}`}
                                        className="flex flex-col items-center group cursor-pointer w-full"
                                    >
                                        {/* Icon Container */}
                                        <div className="relative w-[72px] h-[72px] md:w-24 md:h-24 flex-shrink-0 flex items-center justify-center mb-2 transition-transform duration-200 group-hover:scale-105">
                                            <div className="relative w-full h-full rounded-xl overflow-hidden">
                                                <Image
                                                    src={category.image}
                                                    alt={category.name}
                                                    fill
                                                    className="object-contain"
                                                    sizes="(max-width: 768px) 72px, 96px"
                                                />
                                            </div>
                                        </div>

                                        {/* Label */}
                                        <span className="text-[11px] md:text-xs text-center font-medium leading-snug line-clamp-2 px-1 w-full max-w-[80px] md:max-w-[100px] min-h-[36px] md:min-h-[40px]">
                                            {category.name}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

            </Carousel>

            {/* Carousel navigation progress bar */}
            <div className="flex justify-center mt-6">
                <div className="w-[100px] md:w-[150px] h-1.5 bg-muted rounded-full overflow-hidden relative">
                    <div
                        className="absolute top-0 bottom-0 left-0 bg-primary rounded-full w-[40px] md:w-[60px] transition-transform duration-150 ease-out"
                        style={{ transform: `translate3d(${progress * 1.5}%, 0px, 0px)` }}
                    />
                </div>
            </div>
        </section>
    )
}
