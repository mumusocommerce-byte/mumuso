"use client"

import React, { useEffect, useState } from "react"
import { ProductCard, type Product } from "@/components/product-card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export function RecentlyViewedProducts({ currentProductId }: { currentProductId?: string }) {
    const [recentProducts, setRecentProducts] = useState<Product[]>([])

    useEffect(() => {
        try {
            const raw = localStorage.getItem("recently_viewed_products")
            if (raw) {
                const parsed = JSON.parse(raw)
                const filtered = parsed.filter((p: Product) => p.id !== currentProductId)
                setRecentProducts(filtered)
            }
        } catch (error) {
            console.error(error)
        }
    }, [currentProductId])

    if (recentProducts.length === 0) return null

    return (
        <section className="mt-16 border-t pt-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">Recently Viewed</h2>

            <Carousel
                opts={{
                    align: "start",
                    loop: false,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-4 md:-ml-6">
                    {recentProducts.map((product) => (
                        <CarouselItem key={product.id} className="pl-4 md:pl-6 basis-[80%] md:basis-1/3 lg:basis-1/4">
                            <ProductCard product={product} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="hidden md:block">
                    <CarouselPrevious className="left-0 -translate-x-1/2 bg-background shadow-md border" />
                    <CarouselNext className="right-0 translate-x-1/2 bg-background shadow-md border" />
                </div>
            </Carousel>
        </section>
    )
}

export function TrackRecentlyViewed({ product }: { product: any }) {
    useEffect(() => {
        try {
            const raw = localStorage.getItem("recently_viewed_products")
            let parsed = raw ? JSON.parse(raw) : []

            // Remove if it already exists to avoid duplicates
            parsed = parsed.filter((p: Product) => p.id !== product.id)

            const pCard: Product = {
                id: product.id,
                title: product.title,
                handle: product.handle,
                price: {
                    amount: product.variants?.[0]?.price || "0",
                    currencyCode: "AED"
                },
                image: product.images?.[0]?.url || "https://picsum.photos/seed/placeholder/600/800",
                category: product.tags && product.tags.length > 0 ? product.tags[0] : "All Products",
            }

            // Add to the front
            parsed.unshift(pCard)

            // Limit to 10 products
            if (parsed.length > 10) parsed = parsed.slice(0, 10)

            localStorage.setItem("recently_viewed_products", JSON.stringify(parsed))
        } catch (error) {
            console.error(error)
        }
    }, [product])

    return null
}
