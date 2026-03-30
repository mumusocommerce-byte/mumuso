"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { ProductCard, type Product } from "@/components/product-card"
import { CategoryGrid } from "@/components/category-grid"
import { BentoGrid } from "@/components/bento-grid"
import { TrustBadges } from "@/components/trust-badges"
import { NewsletterBanner } from "@/components/newsletter-banner"
import { SocialFeed } from "@/components/social-feed"
import { HeroSlideshow } from "@/components/hero-slideshow"
import { StoreLocatorBanner } from "@/components/store-locator-banner"
import { Separator } from "@/components/ui/separator"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

interface HomeClientProps {
    products: Product[]
}

export default function HomeClient({ products }: HomeClientProps) {
    const displayProducts = products.length > 0 ? products : []

    const bestSellers = displayProducts.slice(0, 10)
    const newArrivals =
        displayProducts.slice(10, 20).length > 0
            ? displayProducts.slice(10, 20)
            : bestSellers

    if (displayProducts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
                <h1 className="text-2xl font-semibold tracking-tight mb-2">
                    No Products Found
                </h1>
                <p className="text-sm text-muted-foreground max-w-md">
                    We couldn't load any products from your Shopify store. Please check
                    your API credentials and try again.
                </p>
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            {/* ── Hero Banner ─────────────────────────────────────────── */}
            <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
                <Image
                    src="https://cdn.shopify.com/s/files/1/0511/6906/7163/files/Summer_50d6f993-64db-41a2-9a1b-f56b960adc62.jpg?v=1773686682"
                    alt="Hero Banner"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-6 md:px-8">
                        <div className="max-w-xl space-y-6">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                                Elevate Your Lifestyle
                            </h1>
                            <p className="text-base md:text-lg text-white/80 leading-relaxed">
                                Discover carefully curated pieces that define modern aesthetics
                                and comfort for your everyday life.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <Link
                                    href="/catalog"
                                    className={buttonVariants({
                                        size: "lg",
                                        className: "text-sm font-medium",
                                    })}
                                >
                                    Shop Now
                                </Link>
                                <Link
                                    href="/catalog/new-collection"
                                    className={buttonVariants({
                                        size: "lg",
                                        variant: "outline",
                                        className:
                                            "text-sm font-medium bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm",
                                    })}
                                >
                                    View Collections
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Shop By Categories (Mobile App mimicking layout) ── */}
            <CategoryGrid />

            <div className="container mx-auto px-6 md:px-8 mt-8">
                <Separator />
            </div>

            {/* ── Bento Promo Grid ────────────────────────────────────── */}
            <BentoGrid />

            <div className="container mx-auto px-6 md:px-8">
                <Separator />
            </div>

            {/* ── Best Sellers ────────────────────────────────────────── */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-6 md:px-8">
                    <div className="flex items-end justify-between mb-8">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                                Best Sellers
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Our most popular items loved by everyone.
                            </p>
                        </div>
                        <Link
                            href="/catalog/best-selling-items"
                            className={buttonVariants({
                                variant: "ghost",
                                size: "sm",
                                className: "hidden sm:inline-flex gap-1",
                            })}
                        >
                            View All
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>

                    <Carousel
                        opts={{ align: "start", loop: true }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {bestSellers.map((product, i) => (
                                <CarouselItem
                                    key={product.id + i}
                                    className="pl-4 basis-[45%] md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                                >
                                    <ProductCard product={product} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="hidden md:block">
                            <CarouselPrevious className="-left-4 bg-background shadow-sm border" />
                            <CarouselNext className="-right-4 bg-background shadow-sm border" />
                        </div>
                    </Carousel>
                </div>
            </section>

            {/* ── Slideshow Section ─────────────────────────────────── */}
            <HeroSlideshow />

            {/* ── New Arrivals ────────────────────────────────────────── */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-6 md:px-8">
                    <div className="flex items-end justify-between mb-8">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                                New Arrivals
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Be the first to get our latest pieces.
                            </p>
                        </div>
                        <Link
                            href="/catalog/new-mumuso-lifestyle"
                            className={buttonVariants({
                                variant: "ghost",
                                size: "sm",
                                className: "hidden sm:inline-flex gap-1",
                            })}
                        >
                            View All
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>

                    <Carousel
                        opts={{ align: "start", loop: true }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {newArrivals.map((product, i) => (
                                <CarouselItem
                                    key={product.id + i}
                                    className="pl-4 basis-[45%] md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                                >
                                    <ProductCard product={product} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="hidden md:block">
                            <CarouselPrevious className="-left-4 bg-background shadow-sm border" />
                            <CarouselNext className="-right-4 bg-background shadow-sm border" />
                        </div>
                    </Carousel>
                </div>
            </section>

            {/* ── Social Feed / Instagram Marquee ───────────────────── */}
            <SocialFeed />

            {/* ── Store Locator Banner ──────────────────────────────── */}
            <StoreLocatorBanner />

            {/* ── Trust Badges ────────────────────────────────────────── */}
            <TrustBadges />

            {/* ── Newsletter Banner ───────────────────────────────────── */}
            <NewsletterBanner />

        </div>
    )
}
